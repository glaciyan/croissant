using System;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Croissant.Authentication;
using Croissant.Configurations;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace Croissant.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationManager _authManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AuthenticationController(ILogger<AuthenticationController> logger, IMapper mapper,
            UserManager<User> userManager, IAuthenticationManager authManager, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authManager = authManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidateBodyFilter))]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            _logger.LogInformation("User is registering: Username: {Username}, Email: {Email}",
                userForRegistration.UserName, userForRegistration.Email);

            var user = _mapper.Map<User>(userForRegistration);

            var registerResult = await _userManager.CreateAsync(user, userForRegistration.Password);

            if (registerResult.Succeeded)
            {
                _logger.LogInformation("User registration was a success for: {Username} {Email}", user.UserName,
                    user.Email);

                return StatusCode(Status201Created);
            }

            foreach (var error in registerResult.Errors) ModelState.TryAddModelError(error.Code, error.Description);

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidateBodyFilter))]
        public async Task<IActionResult> LoginUser([FromBody] UserForLoginDto userForLogin)
        {
            _logger.LogInformation("Login attempted with email: {Email}", userForLogin.Email);

            var user = await _authManager.AuthenticateUser(userForLogin);

            if (user == null)
            {
                _logger.LogWarning("User login failed for {Email}", userForLogin.Email);
                return Unauthorized("Email or password incorrect");
            }

            HttpContext.Response.Cookies.Append(CookieConfiguration.RefreshTokenCookieKey,
                _authManager.CreateRefreshJwt(user),
                CookieConfiguration.RefreshTokenConfig(_configuration));

            return Ok(new {token = await _authManager.CreateJwt(user)});
        }

        // TODO clean this function it's an absolute mess
        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            // Get the refresh token
            var hasToken =
                HttpContext.Request.Cookies.TryGetValue(CookieConfiguration.RefreshTokenCookieKey,
                    out var refreshToken);
            if (!hasToken || string.IsNullOrWhiteSpace(refreshToken)) return Unauthorized("No refresh token");

            JsonWebToken token;

            // try to serialize the token
            try
            {
                token = new JsonWebToken(refreshToken);
            }
            catch (ArgumentException)
            {
                _logger.LogWarning("Invalid refresh token could not be serialized");
                return Unauthorized("Invalid refresh token");
            }

            // check if the token is in the redis blacklist
            if (await _authManager.TokenHasBeenInvalidated(refreshToken))
            {
                _logger.LogWarning("Invalid refresh token has been invalidated already, Id: {Id}", token.Id);
                return Unauthorized("Invalid refresh token");
            }

            var claims = _authManager.GetClaimsFromRefreshToken(refreshToken);
            var user = await _authManager.GetUserFromRefreshTokenClaims(claims);

            // check with user if the token has the allowed version
            if (user == null || !_authManager.IsCorrectRefreshTokenVersion(claims, user))
            {
                _logger.LogWarning("Invalid refresh token has the incorrect version, Id: {Id}, Version: {Version}",
                    token.Id, token.GetClaim("uver").Value);
                return Unauthorized("Invalid refresh token");
            }

            var newAccess = await _authManager.CreateJwt(user);

            await _authManager.RotateRefreshToken(HttpContext, refreshToken, claims,
                _authManager.CreateRefreshJwt(user));

            return Ok(new {token = newAccess});
        }
    }
}