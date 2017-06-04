using System;
using System.Collections.Generic;
using System.Linq;
using DataModel.Models;
using SpecificImplementation.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericImplementation.Repository.Generic;
using GenericImplementation.UnitOfWork.Interfaces;
using System.Linq.Expressions;

namespace SpecificImplementation.Repository.Classes
{
    public class OperationRepository : GenericRepository<OperationComptable>, IOperationRepository
    {
        public OperationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public IEnumerable<OperationComptable> GetRequestedOperation(Expression<Func<OperationComptable, bool>> predicate)
        {
            return _dbset.Include(op => op.EcritureComptable).Where(predicate);
        }
    }
}
