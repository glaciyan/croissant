using System;
using System.Threading.Tasks;
using AutoMapper;
using Croissant.Data.Repository;
using Entities.DataTransferObject;
using Microsoft.AspNetCore.Mvc;

namespace Croissant.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repo;

        public UsersController(IMapper mapper, IRepositoryManager repo)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var userFromDb = await _repo.Users.GetUserWithRecentPosts(userId);
            if (userFromDb == null) return NotFound();

            var user = _mapper.Map<UserDto>(userFromDb);

            return Ok(user);
        }
    }
}