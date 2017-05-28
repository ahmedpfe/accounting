using GenericImplementation.Repository.Interfaces;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace GenericImplementation.Repository.Generic
{

    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
          where TEntity : class
    {
        protected DbContext _entities;
        protected readonly DbSet<TEntity> _dbset;
        private readonly IUnitOfWork _unitOfWork;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _dbset = unitOfWork.set<TEntity>();
            _entities = _unitOfWork.getContext();
        }

        public virtual IEnumerable<TEntity> GetAll()
        {         
            return  _dbset.AsEnumerable();
        }

        public virtual IEnumerable<TEntity> GetAllWithDetails(params Expression<Func<TEntity, object>>[] includeProperties)
        {

            foreach (var property in includeProperties)
            {
                _dbset.Include(property);
            }
            return _dbset;
        }
        public virtual IEnumerable<TEntity> GetWithDetails(Expression<Func<TEntity, bool>> wherePredicate, params Expression<Func<TEntity, object>>[] includeProperties)
        {

            foreach (var property in includeProperties)
            {
                _dbset.Include(property);
            }
            return _dbset.Where(wherePredicate);
        }

        public IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbset.Where(predicate).AsEnumerable();
        }

        public virtual TEntity Add(TEntity entity)
        { try
            {
                TEntity _entity = _dbset.Add(entity).Entity;
                _entities.Entry(entity).State = EntityState.Added;
                return _entity;
            }
            catch(Exception e)
            {
                return null;
            }
            
        }

        public virtual void Delete(TEntity entity)
        {
                _dbset.Remove(entity);
                _entities.Entry(entity).State = EntityState.Deleted;         
        }

        public virtual TEntity Edit(TEntity entity)
        {          
            _entities.Entry(entity).State = EntityState.Modified;
            return _dbset.Update(entity).Entity;
        }

        public virtual void Save()
        {
            _entities.SaveChanges();
        }
    }
}
