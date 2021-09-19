#nullable enable
using System.Linq;
using Croissant.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Croissant.ActionFilters
{
    public class ValidateBodyFilter : IActionFilter
    {
        private readonly ILogger<ValidateBodyFilter> _logger;

        public ValidateBodyFilter(ILogger<ValidateBodyFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Making use of the default behaviour of Object.ToString() to get the fully qualified object name
            // so make sure ToString() is not overriden
            var parameter = context.ActionArguments
                .SingleOrDefault(arg => arg.Value.ToString()?.Contains("Dto") ?? false).Value;

            var origin = context.ActionDescriptor.DisplayName;

            // ReSharper disable once ConditionIsAlwaysTrueOrFalse
            if (parameter == null)
            {
                _logger.LogWarning("{Origin}: Object sent from client was null", origin);
                context.Result = new BadRequestObjectResult("Object is null");
                return;
            }

            if (!context.ModelState.IsValid)
            {
                _logger.LogWarning("{Origin}: Invalid model state for object sent from client {@ModelStateErrors}", origin,
                    context.ModelState.GetErrors());
                
                context.Result = new UnprocessableEntityObjectResult(context.ModelState);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}