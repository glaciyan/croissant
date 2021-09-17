using Microsoft.Extensions.Hosting;
using Serilog;

namespace Croissant.Logging
{
    public static class LoggingExtension
    {
        public static IHostBuilder ConfigureLogging(this IHostBuilder builder) =>
            builder.UseSerilog((context, services, configuration) => configuration
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services)
                .Enrich.FromLogContext()
                .WriteTo.Console());
    }
}