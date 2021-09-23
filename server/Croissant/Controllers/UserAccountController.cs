using System.Threading.Tasks;
using Croissant.Authentication;
using Croissant.Configurations;
using Croissant.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/users/me")]
    public class UserAccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAuthenticationManager _authManager;

        public UserAccountController(UserManager<User> userManager, IAuthenticationManager authManager)
        {
            _userManager = userManager;
            _authManager = authManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var user = await HttpContext.GetUser(_userManager);

            if (user == null) return BadRequest();
            return Ok($"{user.UserName} {user.Email}");
        }

        // TODO remove, this is just for testing
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> InvalidateAllRefreshTokens()
        {
            var user = await HttpContext.GetUser(_userManager);
            _authManager.UpdateRefreshTokenVersion(user);
            await _userManager.UpdateAsync(user);

            HttpContext.Response.Cookies.Delete(CookieConfiguration.RefreshTokenCookieKey);

            return NoContent();
        }
    }
}