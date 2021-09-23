using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Croissant.Configurations;
using Entities.DataTransferObject;
using Entities.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Croissant.Authentication
{
    internal class AuthenticationManager : IAuthenticationManager
    {
        private readonly IConfiguration _configuration;
        private readonly IConnectionMultiplexer _redis;
        private readonly ILogger<AuthenticationManager> _logger;
        private readonly UserManager<User> _userManager;

        public AuthenticationManager(UserManager<User> userManager, ILogger<AuthenticationManager> logger,
            IConfiguration configuration, IConnectionMultiplexer redis)
        {
            _userManager = userManager;
            _logger = logger;
            _configuration = configuration;
            _redis = redis;
        }

        /// <summary>
        ///     Authenticates the user with email and password
        /// </summary>
        /// <returns>Null if authentication failed otherwise the user</returns>
        public async Task<User> AuthenticateUser(UserForLoginDto userForLogin)
        {
            var user = await _userManager.FindByEmailAsync(userForLogin.Email);
            var correctPassword = await _userManager.CheckPasswordAsync(user, userForLogin.Password);

            if (user == null || !correctPassword) return null;

            return user;
        }

        public async Task<string> CreateJwt(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var expires = Convert.ToDouble(jwtSettings.GetSection("expires").Value);

            var credentials = GetSigningCredentials();
            var claims = await GetClaimsAsync(user);
            var tokenOptions = GenerateTokenOptions(credentials, claims, expires);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public string CreateRefreshJwt(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var expires = Convert.ToDouble(jwtSettings.GetSection("refreshExpires").Value);

            var credentials = GetSigningCredentials();

            var claims = new List<Claim>
            {
                new("uid", user.Id),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // Refresh token version (user version)
                new(ApplicationClaimNames.RefreshTokenVersion, user.RefreshTokenVersion)
            };

            var tokenOptions = GenerateTokenOptions(credentials, claims, expires);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        /// <summary>
        ///     Validates the refreshToken and returns the user id of the refreshToken
        /// </summary>
        /// <returns>Null if refresh token is invalid</returns>
        [CanBeNull]
        public ClaimsPrincipal GetClaimsFromRefreshToken(string refreshToken)
        {
            try
            {
                return new JwtSecurityTokenHandler().ValidateToken(refreshToken,
                    new JwtValidationManager(_configuration).TokenValidationParameters, out _);
            }
            catch (SecurityTokenValidationException ex)
            {
                _logger.LogWarning("Validating refresh token has failed {@Exception}", ex);
                return null;
            }
        }

        public async Task<User> GetUserFromRefreshTokenClaims(ClaimsPrincipal claims)
        {
            // TODO check if refreshToken has been invalidated

            var userId = claims?.FindFirst("uid")?.Value;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                _logger.LogWarning("An attempt to refresh a token has failed because user was null");
                return null;
            }

            return user;
        }

        public async Task RotateRefreshToken(HttpContext httpContext, string oldTokenRaw,
            ClaimsPrincipal oldTokenClaims,
            string newToken)
        {
            httpContext.Response.Cookies.Append(CookieConfiguration.RefreshTokenCookieKey,
                newToken,
                CookieConfiguration.RefreshTokenConfig(_configuration));

            await InvalidateToken(oldTokenRaw);
        }

        public async Task<bool> TokenHasBeenInvalidated(string tokenRaw)
        {
            if (string.IsNullOrWhiteSpace(tokenRaw)) return true;
            var token = new JsonWebToken(tokenRaw);

            var db = _redis.GetDatabase();
            var val = await db.StringGetAsync(token.Id);

            return val.HasValue;
        }

        private async Task InvalidateToken(string oldTokenRaw)
        {
            var oldToken = new JsonWebToken(oldTokenRaw);

            var db = _redis.GetDatabase();
            var expiry = oldToken.ValidTo - DateTime.UtcNow;
            await db.StringSetAsync(oldToken.Id, oldToken.GetClaim(ApplicationClaimNames.RefreshTokenVersion).Value,
                expiry);
        }

        public bool IsCorrectRefreshTokenVersion(ClaimsPrincipal claims, User user)
        {
            // TODO untested
            var tokenVersion = claims.FindFirst(ApplicationClaimNames.RefreshTokenVersion);
            if (tokenVersion == null) return false;

            var userVersion = user.RefreshTokenVersion;

            return userVersion == tokenVersion.Value;
        }

        public void UpdateRefreshTokenVersion(User user)
        {
            user.RefreshTokenVersion = Guid.NewGuid().ToString();
        }

        private static SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWTSECRET")!);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaimsAsync(User user)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.UserName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ApplicationClaimNames.UserId, user.Id)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles) claims.Add(new Claim(ApplicationClaimNames.Roles, role));

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials credentials, List<Claim> claims,
            double expires)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var issuer = jwtSettings.GetSection("validIssuer").Value;
            var audience = jwtSettings.GetSection("validAudience").Value;

            var tokenOptions = new JwtSecurityToken(issuer, audience, claims,
                expires: DateTime.Now.AddMinutes(expires), signingCredentials: credentials);

            return tokenOptions;
        }
    }
}