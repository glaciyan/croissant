using System.Threading.Tasks;

namespace Croissant.Data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DatabaseContext _context;

        public RepositoryManager(DatabaseContext context)
        {
            _context = context;
        }
        
        private PostRepository _postRepository;
        public PostRepository Posts => _postRepository ??= new PostRepository(_context);
        
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}