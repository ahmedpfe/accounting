module app.Services.SpecificServices {
    interface ISaveOperationService {
        createWriting(ecriture: app.Domain.Models.IEcriture);
        getAccount(codeAccount: number, amount: number);
        updateAccount(model: app.Domain.Models.ICompte);
    }
    export class SaveOperationService implements ISaveOperationService {

        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        static $inject = ['$http', '$q'];
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.httpService = $http;
            this.qService = $q;
        }
        AccountingwritingProcess(ecriture, codeAccount, amount)
        {
            var self = this;
            var currentEcriture = ecriture;
            return self.createWriting(ecriture).success(() => {
                self.getAccount(codeAccount, amount);
            });

        }
        createWriting(ecriture)
        {
            var self = this;
            return self.httpService({
                method: "post",
                url: "/api/Ecriture/",              
                data: ecriture
                //,headers: {
                //    'Content-Type': 'application/json'
                //} 
            });
        }
        getAccount(codeAccount,amount) {
            var self = this;
            var currentAccount: app.Domain.Models.Compte;
            return self.httpService({
                method: "get",
                url: "/api/Compte/" + codeAccount
                
            }).success((data) => {
                currentAccount = <app.Domain.Models.Compte>data;
                currentAccount.montantCpt = currentAccount.montantCpt + self.checkAccountType(codeAccount, amount);
                self.updateAccount(currentAccount);
            });
        }
        updateAccount(model) {
            var self = this;
            return self.httpService({
                    method: 'put',
                    data: model,
                    url: '/api/Compte/'
                });  
        }

        checkStart(ch: string, str) {
            return ch.slice(0, str.length) === str;
        };
        checkAccountType(code: string, montant: number) {
            var self = this;
            var codeCpt = code.toString();
            var table = ['7', '1', '40', '42', '43', '44', '46'];
            angular.forEach(table, (value) => {
                if (self.checkStart(codeCpt, value)) {
                    return - montant;
                }
            })
            return montant;
        }
    }
    angular.module('AccountingApp').service('SaveEcritureService', SaveOperationService);
}