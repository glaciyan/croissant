using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.ActionFilters;
using Croissant.Data.Repository;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repo;

        public PostController(IRepositoryManager repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
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
        [ServiceFilter(typeof(ValidateBodyFilter))]
        public async Task<IActionResult> CreatePost([FromBody] PostForCreationDto postForCreation)
        {
            var post = _mapper.Map<Post>(postForCreation);
            _repo.Posts.CreatePost(post);
            await _repo.SaveAsync();

            var postToReturn = _mapper.Map<PostDto>(post);

            return CreatedAtRoute("GetPostById", new {postId = postToReturn.Id}, postToReturn);
        }

        [HttpPut("{postId:guid}")]
        [ServiceFilter(typeof(ValidateBodyFilter))]
        [ServiceFilter(typeof(AssurePostFilter))]
        public async Task<IActionResult> UpdatePost(Guid postId, [FromBody] PostForUpdateDto postForUpdate)
        {
            var postEntity = AssurePostFilter.GetPostFromContext(HttpContext);

            _mapper.Map(postForUpdate, postEntity);
            await _repo.SaveAsync();

            return NoContent();
        }
    }
}