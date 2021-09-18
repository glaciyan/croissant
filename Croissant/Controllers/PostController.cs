using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Croissant.Data.Repository;
using Entities.DataTransferObject;
using Entities.Models;
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

        [HttpGet("{postId:guid}", Name = "GetPostById")]
        [ServiceFilter(typeof(AssurePostFilter))]
        public IActionResult GetPostById(Guid postId)
        {
            var post = AssurePostFilter.GetPostFromContext(HttpContext);
            var postDto = _mapper.Map<PostDto>(post);

            return Ok(postDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostForCreationDto postForCreation)
        {
            // TODO write filter for this
            if (postForCreation == null)
            {
                _logger.LogWarning("{Function}: Got an object of null", nameof(CreatePost));
                return BadRequest("Post was null");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state in {Function} was invalid for {@PostDto} {@ModelState}", nameof(CreatePost),
                    postForCreation, ModelState);
                return UnprocessableEntity(ModelState);
            }

            var post = _mapper.Map<Post>(postForCreation);
            _repo.Posts.CreatePost(post);
            await _repo.SaveAsync();

            var postToReturn = _mapper.Map<PostDto>(post);

            return CreatedAtRoute("GetPostById", new {postId = postToReturn.Id}, postToReturn);
        }

        [HttpPut("{postId:guid}")]
        [ServiceFilter(typeof(AssurePostFilter))]
        public async Task<IActionResult> UpdatePost(Guid postId, [FromBody] PostForUpdateDto postForUpdate)
        {
            // TODO write filter for this
            if (postForUpdate == null)
            {
                _logger.LogWarning("{Function}: Got an object of null", nameof(CreatePost));
                return BadRequest("Post was null");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Model state in {Function} was invalid for {@PostDto} {@ModelState}", nameof(CreatePost),
                    postForUpdate, ModelState);
                return UnprocessableEntity(ModelState);
            }
            
            var postEntity = AssurePostFilter.GetPostFromContext(HttpContext);

            _mapper.Map(postForUpdate, postEntity);
            await _repo.SaveAsync();

            return NoContent();
        }
    }
}