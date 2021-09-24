using System;
using System.Threading.Tasks;
using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Croissant.Data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<User> _userManager;

        private PostRepository _postRepository;
        private UserRepository _userRepository;

        public RepositoryManager(DatabaseContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public PostRepository Posts => _postRepository ??= new PostRepository(_context);
        public UserRepository Users => _userRepository ??= new UserRepository(_userManager);

        public async Task SaveAsync()
        {
            foreach (var entity in _context.ChangeTracker.Entries())
                if (entity.Entity is ITimeStamped timeStamped &&
                    entity.State is EntityState.Added or EntityState.Modified)
                {
                    var now = DateTime.UtcNow;

                    switch (entity.State)
                    {
                        case EntityState.Added:
                            timeStamped.CreatedAt = now;
                            timeStamped.UpdatedAt = null;
                            break;

                        case EntityState.Modified:
                            timeStamped.UpdatedAt = now;
                            break;
                    }
                }

            await _context.SaveChangesAsync();
        }
    }
}