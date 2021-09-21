using System;
using Microsoft.AspNetCore.Http;

namespace Croissant.Configurations
{
    public static class CookieConfiguration
    {
        public static CookieOptions RefreshTokenConfig => new CookieOptions
        {
            Domain = "localhost",
            MaxAge = TimeSpan.FromDays(5),
            HttpOnly = true,
            Secure = true
        };
        
        public const string RefreshTokenCookieKey = "refresh_token";
    }
}