using System.Threading.Tasks;
using Croissant.Authentication;
using Entities.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Croissant.Extensions
{
    public static class HttpContextExtensions
    {
        [ItemCanBeNull]
        public static async Task<User> GetUser(this HttpContext httpContext, UserManager<User> userManager)
        {
            var userClaims = httpContext.User;
            var uidClaim = userClaims.FindFirst(ApplicationClaimNames.UserId);
            
            if (uidClaim == null)
            {
                return null;
            }

            var user = await userManager.FindByIdAsync(uidClaim.Value);
            return user;
        }
    }
}