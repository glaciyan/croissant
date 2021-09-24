using System;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Croissant.Data.Repository
{
    public class UserRepository
    {
        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUserWithRecentPosts(Guid userId, bool trackChanges = false)
        {
            var query =
                _userManager.Users
                    .Where(u => u.Id == userId.ToString())
                    .Include(u =>
                        u.Posts
                            .OrderBy(p => p.CreatedAt)
                            .Take(3));

            return !trackChanges ? await query.AsNoTracking().FirstOrDefaultAsync() : await query.FirstOrDefaultAsync();
        }
    }
}