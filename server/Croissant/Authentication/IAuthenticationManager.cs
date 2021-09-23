using System.Security.Claims;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public interface IAuthenticationManager
    {
        Task<User> AuthenticateUser(UserForLoginDto user);
        Task<string> CreateJwt(User user);
        string CreateRefreshJwt(User user);
        public ClaimsPrincipal GetClaimsFromRefreshToken(string refreshToken);
        public Task<User> GetUserFromRefreshTokenClaims(ClaimsPrincipal claims);
        public void RotateRefreshToken(HttpContext httpContext, string oldToken, ClaimsPrincipal oldTokenClaims,
            string newToken);
    }
}