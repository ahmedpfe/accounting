var app;
(function (app) {
    var Services;
    (function (Services) {
        var SpecificServices;
        (function (SpecificServices) {
            var SaveOperationService = (function () {
                function SaveOperationService($http, $q) {
                    this.httpService = $http;
                    this.qService = $q;
                }
                SaveOperationService.prototype.AccountingwritingProcess = function (ecriture, codeAccount, amount) {
                    var self = this;
                    var currentEcriture = ecriture;
                    return self.createWriting(ecriture).success(function () {
                        self.getAccount(codeAccount, amount);
                    });
                };
                SaveOperationService.prototype.createWriting = function (ecriture) {
                    var self = this;
                    return self.httpService({
                        method: "post",
                        url: "/api/Ecriture/",
                        data: ecriture
                        //,headers: {
                        //    'Content-Type': 'application/json'
                        //} 
                    });
                };
                SaveOperationService.prototype.getAccount = function (codeAccount, amount) {
                    var self = this;
                    var currentAccount;
                    return self.httpService({
                        method: "get",
                        url: "/api/Compte/" + codeAccount
                    }).success(function (data) {
                        currentAccount = data;
                        currentAccount.montantCpt = currentAccount.montantCpt + self.checkAccountType(codeAccount, amount);
                        self.updateAccount(currentAccount);
                    });
                };
                SaveOperationService.prototype.updateAccount = function (model) {
                    var self = this;
                    return self.httpService({
                        method: 'put',
                        data: model,
                        url: '/api/Compte/'
                    });
                };
                SaveOperationService.prototype.checkStart = function (ch, str) {
                    return ch.slice(0, str.length) === str;
                };
                ;
                SaveOperationService.prototype.checkAccountType = function (code, montant) {
                    var self = this;
                    var codeCpt = code.toString();
                    var table = ['7', '1', '40', '42', '43', '44', '46'];
                    angular.forEach(table, function (value) {
                        if (self.checkStart(codeCpt, value)) {
                            return -montant;
                        }
                    });
                    return montant;
                };
                return SaveOperationService;
            }());
            SaveOperationService.$inject = ['$http', '$q'];
            SpecificServices.SaveOperationService = SaveOperationService;
            angular.module('AccountingApp').service('SaveEcritureService', SaveOperationService);
        })(SpecificServices = Services.SpecificServices || (Services.SpecificServices = {}));
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
