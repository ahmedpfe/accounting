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
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Classes
{
    public class JournalService: EntityService<Journal, JournalViewModel>, IJournalService
    {
        IUnitOfWork _unitOfWork;
        IGenericRepository<Journal> _journalRepository;
        IGenericBuilder<JournalViewModel, Journal> _builder;
        private readonly ILogger<EntityService<JournalViewModel,Journal>> _logger;

        public JournalService(IUnitOfWork unitOfWork, IGenericRepository<Journal> journalRepository, ILogger<EntityService<JournalViewModel,Journal>> logger, IGenericBuilder<JournalViewModel,Journal> builder)
            : base(unitOfWork,journalRepository , logger, builder)
        {
            _unitOfWork = unitOfWork;
            _journalRepository = journalRepository;
            _logger = logger;
            _builder = builder;
        }
        public int getScripturesNumber(long id)
        {
           Journal _journal= _journalRepository.GetWithDetails(journal=>journal.CodeJournal==id,Journal=>Journal.EcritureComptable).FirstOrDefault();
            return _journal.EcritureComptable.Count();
        }
    }
}
