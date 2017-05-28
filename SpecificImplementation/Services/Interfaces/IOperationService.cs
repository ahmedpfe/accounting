using DataModel.Models;
using GenericImplementation.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Interfaces
{
    public interface IOperationService: IEntityService<OperationComptable, OperationComptableViewModel>
    {
        int seqId();
    }
}
