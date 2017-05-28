using DataModel.Models;
using SpecificImplementation.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericImplementation.Repository.Generic;
using GenericImplementation.UnitOfWork.Interfaces;

namespace SpecificImplementation.Repository.Classes
{
    public class CompteRepository : GenericRepository<Compte>, ICompteRepository
    {
        public CompteRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public override Compte Add(Compte entity)
        {
            if (entity.IdCptParent!=null)
            {
                entity.LevelCpt=(FindBy(compte => compte.IdCpt == entity.IdCptParent).FirstOrDefault().LevelCpt) + 1;
            }
            return base.Add(entity); 
        }

        public IEnumerable<Compte> GetAllAccountsOfLastLevel()
        {
          
            var list = _dbset.ToList().Where(compte => compte.TypeCpt=="plan");
            return list.Where(c => (list.Where(ac => c.IdCpt == ac.IdCptParent)).Count() == 0).OrderBy(c => c.CodeCpt.ToString().Length).OrderBy(c =>c.CodeCpt.ToString()).AsEnumerable();
        }
        public IEnumerable<Compte> GetAllDefinedAccountsOfLastLevel()
        {

            var list = _dbset.ToList();
            return list.Where(c => (list.Where(ac => c.IdCpt == ac.IdCptParent)).Count() == 0).OrderBy(c => c.CodeCpt.ToString().Length).OrderBy(c => c.CodeCpt.ToString()).AsEnumerable();
        }
        public IEnumerable<Compte> GetSpecificAccounts(String model)
        {
            return GetAllAccountsOfLastLevel().Where(compte => compte.CodeCpt.ToString().StartsWith(model) || compte.LibelleCpt.StartsWith(model)).Where(compte=>compte.VisibilityCpt==true).AsEnumerable();
        }       
    }
}
