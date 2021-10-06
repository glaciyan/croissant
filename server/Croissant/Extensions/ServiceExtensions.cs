using System;
using Croissant.ActionFilters;
using Croissant.Authentication;
using Croissant.Data;
using Croissant.Data.Repository;
using Entities.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

namespace Croissant.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()
                        .AllowCredentials()));
        }

        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Croissant Api",
                    Contact = new OpenApiContact
                    {
                        Name = "glaciyan",
                        Url = new Uri("https://twitter.com/glaciyandev")
                    }
                });
            });
        }

        public static void ConfigureDatabaseConnection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("pgConnection")).UseSnakeCaseNamingConvention();
            });
        }

        public static void ConfigureRepository(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureActionFilters(this IServiceCollection services)
        {
            services.AddScoped<AssurePostFilter>();
            services.AddScoped<ValidateBodyFilter>();
            // disabled when not using jwt
            // services.AddScoped<NewTokenFilter>();
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredUniqueChars = 3;
                options.Password.RequireNonAlphanumeric = false;

                options.User.RequireUniqueEmail = true;
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-";

                options.ClaimsIdentity.UserIdClaimType = ApplicationClaimNames.UserId;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();
        }

        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IAuthenticationManager, CookieAuthenticationManager>();

            services.ConfigureCookie(configuration);
        }

        private static void ConfigureJwt(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                    new JwtValidationManager(configuration).TokenValidationParameters;
            });
        }

        private static void ConfigureCookie(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<CustomCookieAuthenticationEvents>();
            
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.Name = "pid";
                    options.Cookie.SameSite = SameSiteMode.Lax;
                    options.Cookie.HttpOnly = true;

                    options.EventsType = typeof(CustomCookieAuthenticationEvents);
                });
        }
        

        public static void ConfigureRedis(this IServiceCollection services, IConfiguration configuration)
        {
            var multiplexer = ConnectionMultiplexer.Connect(configuration.GetConnectionString("redisConnection"));
            services.AddSingleton<IConnectionMultiplexer>(multiplexer);
        }
    }
}