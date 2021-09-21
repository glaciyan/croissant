using System;
using System.Linq;
using System.Linq.Expressions;

namespace Croissant.Data.Repository
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> GetAll(bool trackChanges);
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges);

        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}