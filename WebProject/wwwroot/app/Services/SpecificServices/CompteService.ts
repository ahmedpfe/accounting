module app.Services.SpecificServices {
    interface ICompteFactory {
        displayAccounts(): ng.IPromise<app.Domain.Models.ICompte[]>;
    }
    export class CompteFactory extends app.Services.GenericService.Factory implements ICompteFactory {

        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        private ws: string;
        private lastLevel: string;
        private definedAccouts: string;
        constructor(public dataService: app.Common.DataService, entity: string, $http: ng.IHttpService, $q: ng.IQService) {
            super(dataService, entity);
            this.httpService = $http;
            this.qService = $q;
            this.ws = "GetPattern";
            this.lastLevel = 'GetAccountsofLastLevel';
            this.definedAccouts = 'WrittingAccounts';  
        }
        public displayAccounts(): ng.IPromise<app.Domain.Models.Compte[]> {
            return this.dataService.get(this.constantService.apiPostURI.concat(this.lastLevel));
        }
        public displayAllDefinedAccounts(): ng.IPromise<app.Domain.Models.Compte[]> {
            return this.dataService.get(this.constantService.apiPostURI);
        }
        public createNewUserAccount(account: app.Domain.Models.Compte): ng.IPromise<app.Domain.Models.Compte> {
            return this.dataService.add(this.constantService.apiPostURI.concat("createAccount"), account);
        }

        public displayWrittingAccounts(): ng.IPromise<app.Domain.Models.Compte[]> {
            return this.dataService.get(this.constantService.apiPostURI.concat(this.definedAccouts));
        }
        public displaySpecificPatternAccounts(pattern: string): ng.IPromise<app.Domain.Models.Compte[]> {
            var data = {
                model: pattern
            };

            var config = {
                params: data,
                headers: { 'Accept': 'application/json' }
            };
            return this.dataService.getWithOptions(this.constantService.apiPostURI.concat(this.ws), config);
        }
        public displayUserAccounts(id: number): ng.IPromise<app.Domain.Models.Compte[]> {
            var userAc = "GetUserAccounts/";
            return this.dataService.get(this.constantService.apiPostURI.concat(userAc)+id);
        }
    }
    angular.module('app.services', []).service('CompteFactory', CompteFactory);
}