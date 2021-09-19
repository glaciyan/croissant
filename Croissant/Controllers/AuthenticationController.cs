using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AuthenticationController(ILogger<AuthenticationController> logger, IMapper mapper,
            UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
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
                await _userManager.AddToRoleAsync(user, "GeneralUser");
                return StatusCode(Status201Created);
            }

            foreach (var error in registerResult.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }
    }
}