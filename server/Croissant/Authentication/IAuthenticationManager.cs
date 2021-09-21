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
        string CreateRefreshJwt(string uid);
        public ClaimsPrincipal GetClaimsFromRefreshToken(string refreshToken);
        public void RotateRefreshToken(HttpContext httpContext, string oldToken, string newToken);
    }
}