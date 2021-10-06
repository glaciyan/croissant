using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace Croissant.Authentication
{
    public class CookieAuthenticationManager : IAuthenticationManager
    {
        private readonly UserManager<User> _userManager;
        private readonly IConnectionMultiplexer _redis;
        private readonly ILogger<CookieAuthenticationManager> _logger;

        public CookieAuthenticationManager(UserManager<User> userManager, IConnectionMultiplexer redis,
            ILogger<CookieAuthenticationManager> logger)
        {
            _userManager = userManager;
            _redis = redis;
            _logger = logger;
        }

        public async Task<User> AuthenticateUser(UserForLoginDto userForLogin)
        {
            var user = await _userManager.FindByEmailAsync(userForLogin.Email);
            var correctPassword = await _userManager.CheckPasswordAsync(user, userForLogin.Password);

            if (user == null || !correctPassword) return null;

            return user;
        }

        public async Task SignInUser(HttpContext context, User user, bool rememberMe)
        {
            var redis = _redis.GetDatabase();
            var changedIdRedisValue = await redis.StringGetAsync(user.Id);
            string changedId = changedIdRedisValue;

            if (changedIdRedisValue.IsNullOrEmpty)
            {
                changedId = Guid.NewGuid().ToString();
                await redis.StringSetAsync(user.Id, changedId);

                _logger.LogInformation("User {UserId} didn't have a changedId created and wrote new Id: {NewId}",
                    user.Id, changedId);
            }

            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Email),
                // new(ClaimTypes.Role, "Administrator"),
                new(ApplicationClaimNames.UserId, user.Id),
                new("ChangedId", changedId)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                IsPersistent = rememberMe
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };


            await context.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }

        public async Task Logout(HttpContext context, User user)
        {
            await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        public async Task InvalidateSessions(Guid userId)
        {
            var redis = _redis.GetDatabase();
            await redis.StringSetAsync(userId.ToString(), Guid.NewGuid().ToString());
        }
    }
}