using GenericImplementation.Repository.Interfaces;
using GenericImplementation.UnitOfWork.Classes;
using GenericImplementation.Builder.Classes;
using GenericImplementation.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;
using GenericImplementation.Services.Interfaces;
using GenericImplementation.Builder.Interfaces;
using GenericImplementation.Services.Classes;
using DataModel.Models;
using GenericImplementation.Repository.Generic;
using SpecificImplementation.Services.Interfaces;
using SpecificImplementation.Services.Classes;
using SpecificImplementation.Repository.Interfaces;
using SpecificImplementation.Repository.Classes;

namespace DependenciesInjection.DIContainer
{
    public class ServicesRegistry : StructureMap.Registry
    {
        public ServicesRegistry()
        {
            /*--------------Context Injection--------------*/
            //ForSingletonOf(typeof(DbContext)).Use(typeof(AccountingModuleContext));
            //For<DbContext>().Use(()=> new AccountingModuleContext (options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))));
            /*--------------Services Injection--------------*/
            For(typeof(IEntityService<,>)).Use(typeof(EntityService<,>));
            For(typeof(ICompteService)).Use(typeof(CompteService));
            For(typeof(IJournalService)).Use(typeof(JournalService));
            For(typeof(IOperationService)).Use(typeof(OperationService));
            For(typeof(IEcritureService)).Use(typeof(EcritureService));
            /*--------------Repositories Injection--------------*/

            For(typeof(IGenericRepository<>)).Use(typeof(GenericRepository<>));
            For(typeof(ICompteRepository)).Use(typeof(CompteRepository));
            For(typeof(IOperationRepository)).Use(typeof(OperationRepository));
            /*--------------Builder Injection--------------*/

            For(typeof(IGenericBuilder<,>)).Use(typeof(GenericBuilder<,>));

            /*--------------Unit Of Work Injection--------------*/

            For(typeof(IUnitOfWork)).Use(typeof(UnitofWork)).ContainerScoped();
        }
    }
}
