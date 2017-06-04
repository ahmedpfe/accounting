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
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Classes
{
    public class OperationService : EntityService<OperationComptable, OperationComptableViewModel>, IOperationService
    {
        IUnitOfWork _unitOfWork;
        IOperationRepository _operationRepository;
        IGenericRepository<Journal> _journalRepository;
        IGenericRepository<ExerciceComptable> _exerciceRepository;
        IGenericBuilder<OperationComptableViewModel, OperationComptable> _builder;
        private readonly ILogger<EntityService<OperationComptableViewModel, OperationComptable>> _logger;
        public OperationService(IUnitOfWork unitOfWork, IOperationRepository operationRepository, IGenericRepository<Journal> journalRepository, IGenericRepository<ExerciceComptable> exerciceRepository,ILogger<EntityService<OperationComptableViewModel, OperationComptable>> logger, IGenericBuilder<OperationComptableViewModel, OperationComptable> builder)
            : base(unitOfWork, operationRepository, logger, builder)
        {
            _unitOfWork = unitOfWork;
            _operationRepository = operationRepository;
            _exerciceRepository = exerciceRepository;
            _journalRepository = journalRepository;
            _logger = logger;
            _builder = builder;
        }
       
        public int seqId()
        {
            var month = DateTime.Now.Month.ToString();
            string _month = "0" + month;
            ExerciceComptable _exercice = _exerciceRepository.FindBy(ex => ex.StatusExercice.Equals("Ongoing")).FirstOrDefault();
            return FindBy(op => op.IdExerciceComptable == _exercice.IdExercice && op.NumPieceJustificatifOp.StartsWith(_month.Substring(_month.Length-2))).Count();
        }
        public IEnumerable<OperationComptableViewModel> GetRequestedOperation(DateTime begin, DateTime end)
        {
            return FindBy(op => op.DateOp >= begin && op.DateOp <= end);
        }
        public IEnumerable<OperationComptableViewModel> GetRequestedOperationWithDetails(DateTime begin, DateTime end)
        {
            IEnumerable<OperationComptableViewModel> _listOperations = _operationRepository.GetRequestedOperation(op => op.DateOp >= begin && op.DateOp <= end).Select(item => _builder.BuildEntity(item)).AsEnumerable();

            var list = _listOperations.ToList();
            list.ForEach(x => {

                EcritureComptableViewModel _ecriture = x.EcritureComptable.FirstOrDefault();
                string journal = _journalRepository.FindBy(j => j.CodeJournal == _ecriture.CodeJ).FirstOrDefault().LibelleJournal;
                ICollection<EcritureComptableViewModel> _collections= x.EcritureComptable;
                _collections.ToList().First().Journal= journal;
                x.EcritureComptable = _collections;
            });
            return list.AsEnumerable();

        }
    }
}
