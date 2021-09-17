using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Someone is trying to access the weather");
            _logger.LogDebug("Someone is trying to access the weather");
            _logger.LogCritical("Someone is trying to access the weather");
            _logger.LogError("Someone is trying to access the weather");
            _logger.LogWarning("Someone is trying to access the weather");

            return Ok(new[] {"value1", "value2"});
        }
    }
}