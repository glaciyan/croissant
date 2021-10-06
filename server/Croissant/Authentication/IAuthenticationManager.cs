using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public interface IAuthenticationManager<T>
    {
        Task<User> AuthenticateUser(UserForLoginDto user);
        Task<T> SignInUser(HttpContext context, User user);
        void UpdateSessionVersion(User user);
    }
}