using DataModel.Models;
using GenericImplementation.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpecificImplementation.Repository.Interfaces
{
    public interface ICompteRepository : IGenericRepository<Compte>
    {
        IEnumerable<Compte> GetAllAccountsOfLastLevel();
        IEnumerable<Compte> GetSpecificAccounts(String model);
        IEnumerable<Compte> GetAllDefinedAccountsOfLastLevel();

    }
}
