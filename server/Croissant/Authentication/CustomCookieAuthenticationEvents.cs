using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using StackExchange.Redis;

namespace Croissant.Authentication
{
    public class CustomCookieAuthenticationEvents : CookieAuthenticationEvents
    {
        private readonly IConnectionMultiplexer _redis;

        public CustomCookieAuthenticationEvents(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
        {
            var userPrincipal = context.Principal;

            var redis = _redis.GetDatabase();
            var currentChangedId = await redis.StringGetAsync(userPrincipal?.Claims
                .Where(c => c.Type == ApplicationClaimNames.UserId).Select(c => c.Value).FirstOrDefault());

            var changedId = userPrincipal?.Claims.Where(c => c.Type == "ChangedId").Select(c => c.Value)
                .FirstOrDefault();

            if (string.IsNullOrEmpty(changedId) || currentChangedId != changedId)
            {
                context.RejectPrincipal();
                await context.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            }
        }

        public override Task RedirectToLogin(RedirectContext<CookieAuthenticationOptions> context)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }

        public override Task RedirectToAccessDenied(RedirectContext<CookieAuthenticationOptions> context)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        }
    }
}