using System.Threading.Tasks;

namespace Croissant.Data.Repository
{
    public interface IRepositoryManager
    {
        public PostRepository Posts { get; }

        Task SaveAsync();
    }
}