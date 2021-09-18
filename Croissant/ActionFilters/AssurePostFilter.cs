using System;
using System.Threading.Tasks;
using Croissant.Data.Repository;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Croissant.ActionFilters
{
    public class AssurePostFilter : IAsyncActionFilter
    {
        private const string PostHttpContextItemsKey = "post";

        private readonly IRepositoryManager _repo;
        private readonly ILogger<AssurePostFilter> _logger;

        public AssurePostFilter(IRepositoryManager repo, ILogger<AssurePostFilter> logger)
        {
            _repo = repo;
            _logger = logger;
        }
        
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var id = (Guid) context.ActionArguments["postId"];
            var post = await _repo.Posts.GetByIdAsync(id);
            if (post == null)
            {
                _logger.LogWarning("Post with id {@Id} was not found", id);
                context.Result = new NotFoundResult();
            }
            else
            {
                context.HttpContext.Items.Add(PostHttpContextItemsKey, post);
                await next();
            }
        }

        public static Post GetPostFromContext(HttpContext context) => context.Items[PostHttpContextItemsKey] as Post;
    }
}