module app.Services.SpecificServices {
    interface IOperationFactory {  
        getCurrentExercice();   
    }
    export class OperationFactory extends app.Services.GenericService.Factory implements IOperationFactory {
        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        private currentExercice: string;
        private currentUser: string;
        private numPJ: string;
        constructor(public dataService: app.Common.DataService, entity: string, $http: ng.IHttpService, $q: ng.IQService) {
            super(dataService, entity);
            this.httpService = $http;
            this.qService = $q;
            this.numPJ = "pj";
            this.currentExercice = this.constantService.apiPostURI.replace(entity, "Exercice").concat("CurrentExercice");
            this.currentUser = this.constantService.apiPostURI.replace(entity, "User");
        }
        public getCurrentExercice(): ng.IPromise<app.Domain.Models.ExerciceComptable> {
            return this.dataService.getSingle(this.currentExercice);
        }
        public getnombrePj(): ng.IPromise<number> {
            return this.dataService.getNumber(this.constantService.apiPostURI.concat(this.numPJ));
        }
        public getCurrentUser(): ng.IPromise<app.Domain.Models.User> {
            return this.dataService.getSingle(this.currentUser);
        }
    }
}