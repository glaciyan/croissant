using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Croissant.Authentication;
using Croissant.Configurations;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace Croissant.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IAuthenticationManager _authManager;

        public AuthenticationController(ILogger<AuthenticationController> logger, IMapper mapper,
            UserManager<User> userManager, IAuthenticationManager authManager)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authManager = authManager;
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

            foreach (var error in registerResult.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }

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
                _authManager.CreateRefreshJwt(user.Id),
                CookieConfiguration.RefreshTokenConfig);

            return Ok(await _authManager.CreateJwt(user));
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var hasToken =
                HttpContext.Request.Cookies.TryGetValue(CookieConfiguration.RefreshTokenCookieKey,
                    out var refreshToken);
            if (!hasToken || refreshToken == null) return BadRequest("No refresh token cookie");

            var claims = _authManager.GetClaimsFromRefreshToken(refreshToken);

            var userId = claims?.FindFirst("uid")?.Value;
            if (userId == null)
            {
                _logger.LogWarning("An attempt to refresh a token has failed because userId was null");
                return Unauthorized("Refresh token is invalid");
            }

            var user = await _userManager.FindByIdAsync(userId);

            var newAccess = await _authManager.CreateJwt(user);

            _authManager.RotateRefreshToken(HttpContext, refreshToken, _authManager.CreateRefreshJwt(user.Id));

            return Ok(newAccess);
        }
    }
}