using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.Data.Repository;
using Entities.DataTransferObject;
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
        private readonly IMapper _mapper;

        public PostController(ILogger<PostController> logger, IRepositoryManager repo, IMapper mapper)
        {
            _logger = logger;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            // TODO paging
            var post = await _repo.Posts.GetPostsAsync();
            var postDto = _mapper.Map<IEnumerable<PostDto>>(post);
            return Ok(postDto);
        }
    }
}