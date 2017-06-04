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
            int length = 12;
            Journal _journal = _journalRepository.FindBy(j => j.CodeJournal == codeJ).FirstOrDefault();
            StringBuilder _patternBuilder = new StringBuilder();
            var date = DateTime.Now;
            switch (_journal.PatternEcriture)
            {
                case "yyyy-N°Seq":
                    {
                        _patternBuilder.Append(date.Year);
                        break;
                    }
                case "mm-yyyy-N°Seq":
                    {
                        string _month = ('0'+date.Month.ToString());
                        _patternBuilder.Append(_month.Substring(_month.Length-2)).Append(date.Year);
                        break;
                    }
                case "dd-mm-yyyy-N°Seq":
                    {
                        string _month = ('0' + date.Month.ToString());
                        string _day = ('0' + date.Day.ToString());
                        _patternBuilder.Append(_day.Substring(_day.Length - 2)).Append(_month.Substring(_month.Length - 2)).Append(date.Year);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            int max = length - _patternBuilder.Length;
            string pattern = _patternBuilder.ToString();
            if (pattern[0] == '0')
              pattern = pattern.Substring(1);
            int nbr = _ecritureRepository.FindBy(e => e.CodeJ == _journal.CodeJournal && e.NumSequenceEcriture.ToString().StartsWith(pattern)).GroupBy(e => e.NumSequenceEcriture).Select(e => e.First()).Count();
            StringBuilder _seq = new StringBuilder(new String('0', max - 1));
            _seq.Append(nbr + 1);
            string numSeq = _seq.ToString();
            string _numSQ = numSeq.Substring(numSeq.Length - max);
            _patternBuilder.Append(_numSQ);
            return _patternBuilder.ToString();
        }
    }
}
