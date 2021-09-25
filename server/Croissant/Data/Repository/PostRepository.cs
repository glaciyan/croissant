using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Croissant.Data.Repository
{
    public class PostRepository : RepositoryBase<Post>
    {
        public PostRepository(DatabaseContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Post>> GetPostsAsync(bool trackChanges = false)
        {
            return await GetAll(trackChanges).OrderByDescending(post => post.CreatedAt).ToListAsync();
        }

        public void CreatePost(Post post)
        {
            Create(post);
        }

        public async Task<Post> GetPostAsync(Guid id, bool trackChanges = false)
        {
            return await FindByCondition(p => p.Id.Equals(id), trackChanges).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsFromUserAsync(string userId, bool trackChanges = false)
        {
            return await FindByCondition(p => p.PosterId.Equals(userId), trackChanges).ToListAsync();
        }
    }
}