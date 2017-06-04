using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GenericImplementation.Services.Interfaces
{
    public interface IEntityService<TEntity,TModel> : IService
    where TModel : class where TEntity : class
    {
        TModel Create(TModel entity);
        void Delete(TEntity entity);
        IEnumerable<TModel> GetAll();
        TModel Update(TModel entity);
        IEnumerable<TModel> FindBy(Expression<Func<TEntity, bool>> predicate);
        TEntity FindEntity(Expression<Func<TEntity, bool>> predicate);
        bool Exist(Expression<Func<TEntity, bool>> predicate);
        IEnumerable<TModel> GetAllWithDetails(params Expression<Func<TEntity, object>>[] includeProperties);
        IEnumerable<TModel> GetSpecifiedWithDetails(Expression<Func<TEntity, bool>> wherePredicate, params Expression<Func<TEntity, object>>[] includeProperties);
        TEntity GetWithDetails(Expression<Func<TEntity, bool>> wherePredicate, params Expression<Func<TEntity, object>>[] includeProperties);
    }
}
