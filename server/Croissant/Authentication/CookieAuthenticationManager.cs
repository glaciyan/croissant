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
                new(ApplicationClaimNames.UserId, user.Id),
                new(ApplicationClaimNames.SessionValidationId, changedId)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddYears(1),
                IsPersistent = rememberMe
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