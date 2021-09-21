using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Croissant.Data.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly DatabaseContext _context;

        protected RepositoryBase(DatabaseContext context)
        {
            _context = context;
        }

        public IQueryable<T> GetAll(bool trackChanges = false)
        {
            return !trackChanges ? _context.Set<T>().AsNoTracking() : _context.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges = false)
        {
            return !trackChanges
                ? _context.Set<T>().Where(expression).AsNoTracking()
                : _context.Set<T>().Where(expression);
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}