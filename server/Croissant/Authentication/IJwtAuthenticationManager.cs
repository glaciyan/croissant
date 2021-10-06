using System.Security.Claims;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public interface IJwtAuthenticationManager<T> : IRefreshingAuthenticationManager<T>
    {
        Task<T> SignInUser(HttpContext context, User user);
        Task<User> AuthenticateUser(UserForLoginDto user);
        void UpdateSessionVersion(User user);
        
        Task<T> CreateJwt(User user);
        T CreateRefreshJwt(User user);
        public ClaimsPrincipal GetClaimsFromRefreshToken(T refreshToken);
        public Task<User> GetUserFromRefreshTokenClaims(ClaimsPrincipal claims);

        public Task RotateRefreshToken(HttpContext httpContext, T oldToken, ClaimsPrincipal oldTokenClaims,
            T newToken);

        public Task<bool> TokenHasBeenInvalidated(T tokenRaw);

        bool IsCorrectRefreshTokenVersion(ClaimsPrincipal claims, User user);
        void UpdateRefreshTokenVersion(User user);
    }
}