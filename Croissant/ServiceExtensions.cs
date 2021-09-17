using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Croissant
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services) => services.AddCors(options =>
            options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));


        public static void ConfigureSwagger(this IServiceCollection services) => services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo()
            {
                Version = "v1",
                Title = "Croissant Api",
                Contact = new OpenApiContact()
                {
                    Name = "glaciyan",
                    Url = new Uri("https://twitter.com/glaciyandev")
                }
            });
        });
    }
}