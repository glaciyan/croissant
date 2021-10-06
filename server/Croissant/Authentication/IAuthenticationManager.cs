using System;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public interface IAuthenticationManager
    {
        Task<User> AuthenticateUser(UserForLoginDto user);
        Task SignInUser(HttpContext context, User user);
        Task Logout(HttpContext context, User user);
        Task InvalidateSessions(Guid userId);
    }
}