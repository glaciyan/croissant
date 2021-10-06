using System.Security.Claims;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.AspNetCore.Http;

namespace Croissant.Authentication
{
    public interface IRefreshingAuthenticationManager<T>
    {
        Task<T> RefreshAuthentication(User user, HttpContext context, T oldToken, ClaimsPrincipal claims);
    }
}