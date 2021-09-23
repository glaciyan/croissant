using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Croissant.Configurations
{
    public static class CookieConfiguration
    {
        public static CookieOptions RefreshTokenConfig(IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            var expires = Convert.ToDouble(jwtSettings.GetSection("refreshExpires").Value);
            
            return new CookieOptions
            {
                Domain = "localhost",
                MaxAge = TimeSpan.FromMinutes(expires),
                HttpOnly = true,
                Secure = true
            };
        }

        public const string RefreshTokenCookieKey = "refresh_token";
    }
}