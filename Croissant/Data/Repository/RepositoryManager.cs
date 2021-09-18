using System;
using System.Threading.Tasks;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Croissant.Data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DatabaseContext _context;

        private PostRepository _postRepository;

        public RepositoryManager(DatabaseContext context)
        {
            _context = context;
        }

        public PostRepository Posts => _postRepository ??= new PostRepository(_context);

        public async Task SaveAsync()
        {
            foreach (var entity in _context.ChangeTracker.Entries())
            {
                if (entity.Entity is ITimeStamped timeStamped && entity.State is EntityState.Added or EntityState.Modified)
                {
                    switch (entity.State)
                    {
                        case EntityState.Added:
                            timeStamped.CreatedAt = DateTime.UtcNow;
                            timeStamped.UpdatedAt = DateTime.UtcNow;
                            break;
                        
                        case EntityState.Modified:
                            timeStamped.UpdatedAt = DateTime.UtcNow;
                            break;
                    }
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}