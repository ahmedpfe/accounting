using DataModel.Models;
using GenericImplementation.Builder.Interfaces;
using GenericImplementation.Services.Classes;
using GenericImplementation.Services.Interfaces;
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
    public class CompteService: EntityService<Compte,CompteViewModel>, ICompteService
    {
        IUnitOfWork _unitOfWork;
        ICompteRepository _compteRepository;
        IGenericBuilder<CompteViewModel, Compte> _builder;
        private readonly ILogger<EntityService<CompteViewModel, Compte>> _logger;

        public CompteService(IUnitOfWork unitOfWork, ICompteRepository compteRepository,ILogger<EntityService<CompteViewModel, Compte>> logger, IGenericBuilder<CompteViewModel, Compte> builder)
            : base(unitOfWork,compteRepository, logger, builder)
        {
            _unitOfWork = unitOfWork;
            _compteRepository = compteRepository;
            _logger = logger;
            _builder = builder;
        }

        public IEnumerable<CompteViewModel> GetAllAccountsOfLastLevel()
        {
            _logger.LogDebug("{method} called", nameof(GetAllAccountsOfLastLevel));
            return _compteRepository.GetAllAccountsOfLastLevel().Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public IEnumerable<CompteViewModel> EcritureAccounts()
        {
            _logger.LogDebug("{method} called", nameof(EcritureAccounts));
            return _compteRepository.GetAllDefinedAccountsOfLastLevel().Where(c=>c.VisibilityCpt==true).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public IEnumerable<CompteViewModel> GetSpecificAccounts(String model)
        {
            _logger.LogDebug("{method} called", nameof(GetSpecificAccounts));
            return _compteRepository.GetSpecificAccounts(model).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public IEnumerable<CompteViewModel> GetUserAccounts(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetUserAccounts));
            return _compteRepository.FindBy(compte=> compte.TypeCpt.Equals("user")).Where(compte=>compte.IdCptParent==id).Select(item => _builder.BuildEntity(item)).AsEnumerable();
        }
        public CompteViewModel AddUserAccount(CompteViewModel model)
        {
            model.IdCptParent = findParentAccount(model.CodeCpt.ToString(),1);
            return Create(model);
        }
        private long findParentAccount(string code, int length)
        {

            if (!FindBy(compte => compte.CodeCpt == long.Parse(code.Substring(0, length))).Any())
            {
                return FindBy(compte => compte.CodeCpt == long.Parse(code.Substring(0, length-1))).FirstOrDefault().IdCpt;
            }
            else
            {
                return findParentAccount(code,length+1);
            }
        }
        public Compte getAccount(long id)
        {
            return FindEntity(compte => compte.CodeCpt == id);
        }
        override
        public CompteViewModel Update(CompteViewModel model)
        {
            _logger.LogDebug("{method} called", nameof(Update));
            if (model == null) throw new ArgumentNullException("entity " + typeof(CompteViewModel));          
            Compte _oldEntity = FindEntity(c=>c.IdCpt == model.IdCpt);
            _oldEntity.LibelleCpt = model.LibelleCpt;
            _oldEntity.VisibilityCpt = model.VisibilityCpt;         
            _unitOfWork.Commit();
            return _builder.BuildEntity(_oldEntity);
        }
    }
}
