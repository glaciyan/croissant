using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;

namespace Croissant.Authentication
{
    public interface IAuthenticationManager
    {
        Task<User> AuthenticateUser(UserForLoginDto user);
        Task<string> CreateJwt(User user);
    }
}