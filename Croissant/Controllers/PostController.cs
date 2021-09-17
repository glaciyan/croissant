using System.Threading.Tasks;
using Croissant.Data.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly ILogger<PostController> _logger;
        private readonly IRepositoryManager _repo;

        public PostController(ILogger<PostController> logger, IRepositoryManager repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            return Ok(await _repo.Posts.GetPostsAsync());
        }
    }
}