using DataModel.Models;
using GenericImplementation.Services.Interfaces;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;
using SpecificImplementation.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpecificImplementation.Services.Interfaces
{
    public interface ICompteService: IEntityService<Compte,CompteViewModel>
    {

        IEnumerable<CompteViewModel> GetAllAccountsOfLastLevel();
        IEnumerable<CompteViewModel> GetSpecificAccounts(String model);
        IEnumerable<CompteViewModel> GetUserAccounts(long id);
        CompteViewModel AddUserAccount(CompteViewModel model);
        Compte getAccount(long id);
        IEnumerable<CompteViewModel> EcritureAccounts();
    }
}
