using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Croissant.Configurations
{
    public static class CookieConfiguration
    {
        public const string RefreshTokenCookieKey = "refresh_token";

        public static CookieOptions RefreshTokenConfig(IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            var expires = Convert.ToDouble(jwtSettings.GetSection("refreshExpires").Value);

            return new CookieOptions
            {
                MaxAge = TimeSpan.FromSeconds(expires),
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Path = "/api/auth/token"
            };
        }
    }
}