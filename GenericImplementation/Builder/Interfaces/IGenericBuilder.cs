using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GenericImplementation.Builder.Interfaces
{
    public interface IGenericBuilder<TModel, TEntity>
    where TModel : class
    where TEntity : class
    {
        TModel BuildEntity(TEntity entity);
        TEntity BuildModel(TModel model);
    }
}
