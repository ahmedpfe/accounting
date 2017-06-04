using GenericImplementation.Builder.Interfaces;
using GenericImplementation.Repository.Interfaces;
using GenericImplementation.Services.Interfaces;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GenericImplementation.Services.Classes
{
    public class EntityService<TEntity,TModel> : IEntityService<TEntity,TModel> 
    where TEntity : class where TModel : class 
    {
        IUnitOfWork _unitOfWork;
        IGenericRepository<TEntity> _repository;
        IGenericBuilder<TModel, TEntity> _builder;
        private readonly ILogger<EntityService<TModel, TEntity>> _logger;

        public EntityService(IUnitOfWork unitOfWork, IGenericRepository<TEntity> repository, ILogger<EntityService<TModel, TEntity>> logger, IGenericBuilder<TModel, TEntity> builder)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _logger = logger;
            _builder = builder;
        }


        public virtual TModel Create(TModel model)
        {           
            _logger.LogDebug("{method} called", nameof(Create));
            if (model == null)
            {
                throw new ArgumentNullException("entity " + typeof(TModel));
            }

            try
            {
                TEntity _entity = _builder.BuildModel(model);
                _entity = _repository.Add(_entity);
                _unitOfWork.Commit();
                return _builder.BuildEntity(_entity);
            }
            catch(Exception e)
            {
                return null;
            }
            
        }


        public virtual TModel Update(TModel model)
        {
            _logger.LogDebug("{method} called", nameof(Update));
            if (model == null) throw new ArgumentNullException("entity " + typeof(TModel));
            TEntity _entity = _builder.BuildModel(model);
            TEntity entity = _repository.Edit(_entity);
            _unitOfWork.Commit();
            return _builder.BuildEntity(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            try
            {
                _logger.LogDebug("{method} called", nameof(Delete));
                _repository.Delete(entity);
                _unitOfWork.Commit();
            }catch (Exception e) { }
        }

        public IEnumerable<TModel> GetAll()
        {
            _logger.LogDebug("{method} called", nameof(GetAll));


            return _repository.GetAll().Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }

        public IEnumerable<TModel> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            _logger.LogDebug("{method} called", nameof(FindBy));
            return _repository.FindBy(predicate).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public TEntity FindEntity(Expression<Func<TEntity, bool>> predicate)
        {
            _logger.LogDebug("{method} called", nameof(FindBy));
            return _repository.FindBy(predicate).FirstOrDefault();
        }
        public bool Exist(Expression<Func<TEntity, bool>> predicate)
        {
            _logger.LogDebug("{method} called", nameof(Exist));
            return (FindBy(predicate)!=null);
        }
        public IEnumerable<TModel> GetAllWithDetails(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            _logger.LogDebug("{method} called", nameof(GetAllWithDetails));
            return _repository.GetAllWithDetails(includeProperties).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public TEntity GetWithDetails(Expression<Func<TEntity, bool>> wherePredicate, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            _logger.LogDebug("{method} called", nameof(GetWithDetails));
            return _repository.GetWithDetails(wherePredicate, includeProperties).FirstOrDefault();
        }
        public IEnumerable<TModel> GetSpecifiedWithDetails(Expression<Func<TEntity, bool>> wherePredicate, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            _logger.LogDebug("{method} called", nameof(GetWithDetails));
            return _repository.GetWithDetails(wherePredicate, includeProperties).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
    }
}
