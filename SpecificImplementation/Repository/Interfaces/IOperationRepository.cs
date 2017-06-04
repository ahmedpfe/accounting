using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataModel.Models;
using GenericImplementation.Repository.Interfaces;
using System.Linq.Expressions;

namespace SpecificImplementation.Repository.Interfaces
{
    public interface IOperationRepository : IGenericRepository<OperationComptable>
    {
        IEnumerable<OperationComptable> GetRequestedOperation(Expression<Func<OperationComptable, bool>> predicate);

    }
}
