using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Croissant.Extensions
{
    public static class ModelStateExtension
    {
        public static IEnumerable<object> GetErrors(this ModelStateDictionary dict)
        {
            return dict.Where(ms => ms.Value.ValidationState == ModelValidationState.Invalid)
                .Select(ms => new
                {
                    Field = ms.Key,
                    ErrorMessages = ms.Value.Errors.Select(e => e.ErrorMessage)
                });
        }
    }
}