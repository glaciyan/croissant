using System;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public class CookieAuthenticationManager : IAuthenticationManager
    {
        public Task<User> AuthenticateUser(UserForLoginDto user)
        {
            throw new NotImplementedException();
        }

        public Task SignInUser(HttpContext context, User user)
        {
            throw new NotImplementedException();
        }

        public void UpdateSessionVersion(User user)
        {
            throw new NotImplementedException();
        }
    }
}