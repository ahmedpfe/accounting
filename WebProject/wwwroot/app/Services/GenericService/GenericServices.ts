module app.Services.GenericService
{
    interface IFactory {
        constantService: app.Common.ConstantService;
        updateData(model: app.Domain.GenericModel.EntityBase);
    }
    export class Factory {
        constantService: app.Common.ConstantService;

        constructor(public dataService: app.Common.DataService, private entity: string) {
            this.constantService = new app.Common.ConstantService(entity);
        }
        public displaydata() {
            return this.dataService.get(this.constantService.apiPostURI);
        }       
        createNewData(model: app.Domain.GenericModel.EntityBase) {
            return this.dataService.add(this.constantService.apiPostURI,model);
        };
        updateData(model: app.Domain.GenericModel.EntityBase) {
            return this.dataService.update(this.constantService.apiPostURI ,model);
        };
        deleteData(id: number){
            return this.dataService.remove(this.constantService.apiPostURI+id);
        };
        GetSpecificData(id:number) {
            return this.dataService.getSingle(this.constantService.apiPostURI+id);
        };
    }
    angular.module('app.services', []).service('genericService', Factory);
}