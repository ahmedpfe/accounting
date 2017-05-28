using DataModel.Models;
using GenericImplementation.Builder.Interfaces;
using GenericImplementation.Repository.Generic;
using GenericImplementation.Repository.Interfaces;
using GenericImplementation.Services.Classes;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;
using SpecificImplementation.Repository.Interfaces;
using SpecificImplementation.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Classes
{
    public class OperationService : EntityService<OperationComptable, OperationComptableViewModel>, IOperationService
    {
        IUnitOfWork _unitOfWork;
        IGenericRepository<OperationComptable> _operationRepository;
        IGenericRepository<ExerciceComptable> _exerciceRepository;
        IGenericBuilder<OperationComptableViewModel, OperationComptable> _builder;
        private readonly ILogger<EntityService<OperationComptableViewModel, OperationComptable>> _logger;
        public OperationService(IUnitOfWork unitOfWork, IGenericRepository<OperationComptable> operationRepository, IGenericRepository<ExerciceComptable> exerciceRepository,ILogger<EntityService<OperationComptableViewModel, OperationComptable>> logger, IGenericBuilder<OperationComptableViewModel, OperationComptable> builder)
            : base(unitOfWork, operationRepository, logger, builder)
        {
            _unitOfWork = unitOfWork;
            _operationRepository = operationRepository;
            _exerciceRepository = exerciceRepository;
            _logger = logger;
            _builder = builder;
        }
       
        public int seqId()
        {
            var month = DateTime.Now.Month.ToString();
            ExerciceComptable _exercice = _exerciceRepository.FindBy(ex => ex.StatusExercice.Equals("Ongoing")).FirstOrDefault();
            return FindBy(op => op.IdExerciceComptable == _exercice.IdExercice && op.NumPieceJustificatifOp.StartsWith(month)).Count();
        }
        
    }
}
