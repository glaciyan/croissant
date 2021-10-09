using System;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Croissant.Authentication;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
                return Unauthorized("Email or password is incorrect");
            }

            await _authManager.SignInUser(HttpContext, user, userForLogin.RememberMe);

            var userToReturn = _mapper.Map<UserDto>(user);
            return Ok(userToReturn);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authManager.Logout(HttpContext);
            return NoContent();
        }

        [HttpPost("invalidate")]
        [Authorize]
        public async Task<IActionResult> InvalidateSessions()
        {
            var userId = _userManager.GetUserId(User);
            await _authManager.InvalidateSessions(new Guid(userId));
            // await _authManager.Logout(HttpContext);

            return NoContent();
        }

        #region jwt login

        // [HttpPost("login")]
        // [ServiceFilter(typeof(ValidateBodyFilter))]
        // public async Task<IActionResult> LoginUser([FromBody] UserForLoginDto userForLogin)
        // {
        //     _logger.LogInformation("Login attempted with email: {Email}", userForLogin.Email);
        //
        //     var user = await _authManager.AuthenticateUser(userForLogin);
        //
        //     if (user == null)
        //     {
        //         _logger.LogWarning("User login failed for {Email}", userForLogin.Email);
        //         return Unauthorized("Email or password incorrect");
        //     }
        //
        //     return Ok(new {token = await _authManager.SignInUser(HttpContext, user)});
        // }

        #endregion

        #region token

        // [HttpGet("token")]
        // [ServiceFilter(typeof(NewTokenFilter))]
        // public async Task<IActionResult> GetToken()
        // {
        //     var user = HttpContext.Items["user"] as User;
        //     var claims = HttpContext.Items["claims"] as ClaimsPrincipal;
        //     var token = HttpContext.Items["token"] as JsonWebToken;
        //
        //     if (_authManager is IJwtAuthenticationManager<string> jwtAuthenticationManager)
        //         return Ok(new
        //         {
        //             token = await jwtAuthenticationManager.RefreshAuthentication(user, HttpContext, token!.EncodedToken,
        //                 claims)
        //         });
        //
        //     return BadRequest("Server not configured to handle this endpoint");
        // }

        #endregion
    }
}