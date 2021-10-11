using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.Authentication;
using Croissant.Data.Repository;
using Entities.DataTransferObject;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Croissant.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users/me")]
    public class UserAccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAuthenticationManager _authManager;
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public UserAccountController(UserManager<User> userManager, IAuthenticationManager authManager,
            IRepositoryManager repository, IMapper mapper)
        {
            _userManager = userManager;
            _authManager = authManager;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null) return BadRequest();

            var userToReturn = _mapper.Map<UserDto>(user);
            return Ok(userToReturn);
        }

        [HttpGet("posts")]
        public async Task<IActionResult> GetMyPosts()
        {
            var userId = _userManager.GetUserId(User);

            var postsFromDb = await _repository.Posts.GetPostsFromUserAsync(userId);
            var posts = _mapper.Map<IEnumerable<PostDto>>(postsFromDb);

            return Ok(posts);
        }
    }
}