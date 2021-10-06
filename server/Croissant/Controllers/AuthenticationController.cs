using System.Security.Claims;
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
        private readonly IJwtAuthenticationManager _authManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AuthenticationController(ILogger<AuthenticationController> logger, IMapper mapper,
            UserManager<User> userManager, IJwtAuthenticationManager authManager, IConfiguration configuration)
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

        [HttpGet("token")]
        [ServiceFilter(typeof(NewTokenFilter))]
        public async Task<IActionResult> GetToken()
        {
            var user = HttpContext.Items["user"] as User;
            var claims = HttpContext.Items["claims"] as ClaimsPrincipal;
            var token = HttpContext.Items["token"] as JsonWebToken;

            var newAccess = await _authManager.CreateJwt(user);

            await _authManager.RotateRefreshToken(HttpContext, token!.EncodedToken, claims,
                _authManager.CreateRefreshJwt(user));

            return Ok(new {token = newAccess});
        }
    }
}