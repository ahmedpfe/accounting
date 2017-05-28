using DataModel.Models;
using GenericImplementation.Builder.Interfaces;
using GenericImplementation.Repository.Interfaces;
using GenericImplementation.Services.Classes;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;
using SpecificImplementation.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Classes
{
    public class EcritureService : EntityService<EcritureComptable, EcritureComptableViewModel>, IEcritureService
    {
        IUnitOfWork _unitOfWork;
        IGenericRepository<Journal> _journalRepository;
        IGenericRepository<EcritureComptable> _ecritureRepository;
        IGenericBuilder<EcritureComptableViewModel, EcritureComptable> _builder;
        private readonly ILogger<EntityService<EcritureComptableViewModel, EcritureComptable>> _logger;

        public EcritureService(IUnitOfWork unitOfWork, IGenericRepository<EcritureComptable> ecritureRepository, IGenericRepository<Journal> journalRepository, ILogger<EntityService<EcritureComptableViewModel, EcritureComptable>> logger, IGenericBuilder<EcritureComptableViewModel, EcritureComptable> builder)
            : base(unitOfWork, ecritureRepository, logger, builder)
        {
            _unitOfWork = unitOfWork;
            _ecritureRepository = ecritureRepository;
            _journalRepository = journalRepository;
            _logger = logger;
            _builder = builder;
        }


        public string numEcritureGenere(long codeJ)
        {
            int max = 5;
            Journal _journal = _journalRepository.FindBy(j => j.CodeJournal == codeJ).FirstOrDefault();
            StringBuilder _patternBuilder = new StringBuilder();
            switch (_journal.PatternEcriture)
            {
                case "yyyy-Prefix":
                    {
                        _patternBuilder.Append(DateTime.Now.Year);
                        break;
                    }
                case "mm-yyyy-Prefix":
                    {
                        var date = DateTime.Now;
                        _patternBuilder.Append(date.Month).Append(date.Year);
                        break;
                    }
                case "dd-mm-yyyy-Prefix":
                    {
                        var date = DateTime.Now;
                        _patternBuilder.Append(date.Date).Append(date.Month).Append(date.Year);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            int nbr = _ecritureRepository.FindBy(e => e.CodeJ == _journal.CodeJournal && e.NumEcriture.ToString().StartsWith(_builder.ToString())).GroupBy(e => e.NumeroOperation).Select(e => e.First()).Count();
            StringBuilder _seq = new StringBuilder(new String('0', max - 1));
            _seq.Append(nbr + 1);
            string numSeq = _seq.ToString();
            String _numSQ = numSeq.Substring(numSeq.Length - max);
            _patternBuilder.Append(_journal.PrefixJournal).Append(_numSQ);
            return _patternBuilder.ToString();
        }
    }
}
