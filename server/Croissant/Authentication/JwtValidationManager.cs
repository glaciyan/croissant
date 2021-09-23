using System;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Croissant.Authentication
{
    public class JwtValidationManager
    {
        private string Issuer { get; }
        private string Audience { get; }
        private SymmetricSecurityKey Secret { get; }
        
        public JwtValidationManager(IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");

            Issuer = jwtSettings.GetSection("validIssuer").Value;
            Audience = jwtSettings.GetSection("validAudience").Value;

            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWTSECRET")!);
            Secret = new SymmetricSecurityKey(key);
        }
        
        public TokenValidationParameters TokenValidationParameters =>
            new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = Issuer,
                ValidAudience = Audience,

                IssuerSigningKey = Secret
            };
    }
}