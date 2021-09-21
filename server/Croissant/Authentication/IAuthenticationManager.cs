using System.Security.Claims;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;

namespace Croissant.Authentication
{
    public interface IAuthenticationManager
    {
        Task<User> AuthenticateUser(UserForLoginDto user);
        Task<string> CreateJwt(User user);
        string CreateRefreshJwt(string uid);
        public ClaimsPrincipal GetClaimsFromRefreshToken(string refreshToken);
    }
}