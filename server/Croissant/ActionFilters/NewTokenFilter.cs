using System;
using System.Threading.Tasks;
using Croissant.Authentication;
using Croissant.Configurations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Croissant.ActionFilters
{
    public class NewTokenFilter : IAsyncActionFilter
    {
        private const string InvalidRefreshToken = "Invalid refresh token";

        private readonly ILogger<NewTokenFilter> _logger;
        private readonly IJwtAuthenticationManager<string> _authManager;

        public NewTokenFilter(ILogger<NewTokenFilter> logger, IJwtAuthenticationManager<string> authManager)
        {
            _logger = logger;
            _authManager = authManager;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Get the refresh token
            var hasToken =
                context.HttpContext.Request.Cookies.TryGetValue(CookieConfiguration.RefreshTokenCookieKey,
                    out var refreshToken);

            if (!hasToken || string.IsNullOrWhiteSpace(refreshToken))
            {
                context.Result = new UnauthorizedObjectResult("No refresh token");
                return;
            }

            JsonWebToken token;

            // try to serialize the token
            try
            {
                token = new JsonWebToken(refreshToken);
            }
            catch (ArgumentException)
            {
                _logger.LogWarning("Invalid refresh token could not be serialized");

                context.Result = new UnauthorizedObjectResult(InvalidRefreshToken);
                return;
            }

            // check if the token is in the redis blacklist
            if (await _authManager.TokenHasBeenInvalidated(refreshToken))
            {
                _logger.LogWarning("Invalid refresh token has been invalidated already, Id: {Id}", token.Id);

                context.Result = new UnauthorizedObjectResult(InvalidRefreshToken);
                return;
            }

            var claims = _authManager.GetClaimsFromRefreshToken(refreshToken);
            var user = await _authManager.GetUserFromRefreshTokenClaims(claims);

            // check with user if the token has the allowed version
            if (user == null || !_authManager.IsCorrectRefreshTokenVersion(claims, user))
            {
                _logger.LogWarning("Invalid refresh token has the incorrect version, Id: {Id}, Version: {Version}",
                    token.Id, token.GetClaim("uver").Value);

                context.Result = new UnauthorizedObjectResult(InvalidRefreshToken);
                return;
            }

            context.HttpContext.Items.Add("claims", claims);
            context.HttpContext.Items.Add("user", user);
            context.HttpContext.Items.Add("token", token);

            await next();
        }
    }
}