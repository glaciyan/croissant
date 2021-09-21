using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Croissant.Extensions
{
    public static class ExceptionHandlingExtensions
    {
        public static void UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(error =>
            {
                error.Run(async context =>
                {
                    // don't give the client too much info, it just didn't work
                    await context.Response.WriteAsJsonAsync(new
                        {code = HttpStatusCode.InternalServerError, message = "Internal Server Error."});
                });
            });
        }
    }
}