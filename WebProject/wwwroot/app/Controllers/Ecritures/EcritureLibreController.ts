module app.Controllers.Ecritures {
    interface IEntryWriting {
        ExerciceYear: number;
        ExerciceMonth: number;
        ExerciceDay: number;
        numPiece: string;
        OperationService: app.Services.SpecificServices.OperationFactory;

    }
    export class EntryWritingCtrl implements IEntryWriting {
        ExerciceYear: number;
        ExerciceMonth: number;
        ExerciceDay: number;
        numPiece: string;
        maxLength: number = 8;
        exerciceCode: number;
        currentDate: Date;
        currentUser: app.Domain.Models.IUser;
        Scope: ng.IScope;
        accounts: kendo.data.ObservableArray;
        operationToSave: app.Domain.Models.Operation;
        OperationService: app.Services.SpecificServices.OperationFactory;
        journalService: app.Services.GenericService.Factory;
        CompteService: app.Services.SpecificServices.CompteFactory;
        EcritureService: app.Services.SpecificServices.EcritureFactory;
        value: number;
        timeOut: ng.ITimeoutService;
        static $inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$route', '$timeout'];
        constructor(private dataService: app.Common.DataService, private httpTranslator: app.Exceptions.Common.HttpTranslator, public $http: ng.IHttpService, public $q: ng.IQService, $scope: ng.IScope, private $root: ng.route.IRoute, $timeout: ng.ITimeoutService) {
            var self = this;
            self.Scope = $scope;
            self.OperationService = new app.Services.SpecificServices.OperationFactory(dataService, "Operation", $http, $q);
            self.journalService = new app.Services.GenericService.Factory(dataService, "Journal");
            self.CompteService = new app.Services.SpecificServices.CompteFactory(dataService, "Compte", $http, $q);
            self.EcritureService = new app.Services.SpecificServices.EcritureFactory(dataService, "Ecriture", $http, $q);
            self.timeOut = $timeout;
            self.numPieceC();
            self.dateSetting();          
            self.journalSetting();
            self.getAllAccounts();           
            self.userSetting();
            self.Scope.data = [{}];
            self.Scope.number = 1;
            self.Scope.sum = 0;
            self.Scope.debit = 0;
            self.Scope.credit = 0;
            self.Scope.generee = false;
            self.Scope.leaving = true;
            self.Scope.index = 0;
            self.Scope.newLine = false;
            self.Scope.validate = false;
            $scope.$watch('data.length', function () {
                self.Scope.data.filter(function (obj) {
                    if (obj.status == false)
                    {
                        self.Scope.validate = false;
                    }
                });
            })
            self.Scope.$watchGroup(['validate', 'suppressionError','preventSave'], () => {
                if (self.Scope.suppressionError || self.Scope.preventSave) {
                        delete self.Scope.infoMsg;
                }
                else {
                    if (!self.Scope.validate)
                            {
                        self.Scope.infoMsg = "Every line must be properly populated otherwise it will not be saved as a part of your accounting writing";
                    }
                    else
                    {
                        delete self.Scope.infoMsg;
                    }
                   }
            });
        }
        validPasser(form, isValid) {
            var self = this;
            if (isValid) {
                form.status = true;
                self.Scope.validate = true;
            }
            else
            {
                form.status = false;
                self.Scope.validate = false;
            }
            self.sum();
        }
        journalSetting() {
            var self = this;
            self.journalService.displaydata().then((result) => {
                self.Scope.journal = new Array();
                result.map((j: app.Domain.Models.Journal) => { self.Scope.journal.push(j.prefixJournal) });
            });
        }
        regIsNumber(data): boolean {
            var reg = new RegExp("[1-7][0-9]*");
            return reg.test(data);
        }
        remove(index)
        {
            var self = this;
            if (self.Scope.data.length == 1)
            {
                self.Scope.suppressionError = "You can't remove a accounting writing line when you have a single row";          
                self.timeOut(() => {
                    delete self.Scope.suppressionError;
                }, self.httpTranslator.timer);
            }
            else
            {
                let status = self.Scope.data[index].status;
                self.Scope.data.splice(index, 1);
                if (status)
                {
                    self.sum();
                }
            }
            self.Scope.validate = true;
        }
        accountChanged(e)
        {
            var self = this;
            if (!self.regIsNumber(e.currentTarget.value))
            {
                e.currentTarget.value = "";
            }
        }
        solderEcriture(index,imputer)
        {
            var self = this;
            if (imputer.localeCompare('debit')==0)
            {
                if (self.Scope.data[index].montantDebitEcriture)
                    self.Scope.data[index].montantDebitEcriture = Number(self.Scope.data[index].montantDebitEcriture) - Number(self.Scope.sum);
                else
                    self.Scope.data[index].montantDebitEcriture = - Number(self.Scope.sum);
            }
            else
            {
                if (self.Scope.data[index].montantCreditEcriture)
                    self.Scope.data[index].montantCreditEcriture = Number(self.Scope.data[index].montantCreditEcriture) + Number(self.Scope.sum);
                else
                    self.Scope.data[index].montantCreditEcriture = Number(self.Scope.sum);
            }
            self.sum();
            self.Scope.focus = false;
        }
        dateSetting() {
            var self = this;
            
            self.OperationService.getCurrentExercice().then((result: app.Domain.Models.IExerciceComptable) => {
                self.ExerciceYear = Number(result.dateOuvertureExercice.toString().substring(0, 4));
                self.exerciceCode = result.idExercice;
                self.currentDate = new Date();
                self.ExerciceMonth = Number(self.currentDate.getMonth());
                self.ExerciceDay = Number(self.currentDate.getDate());
                
            });           
        }
        numPieceC() {
            var self = this;
            self.OperationService.getnombrePj().then((result) => {
                var date = new Date();
                var day = ('0' + (date.getDate().toString())).slice(-2)
                var month = ('0' + (date.getMonth().toString())).slice(-2);
                var numP = ('000' + (result + 1).toString()).slice(-4);
                self.numPiece = month.concat(day).concat(numP);
            });
        }
        sum()
        {
            var self = this;
            var debit = 0, credit = 0;
            for (var i = 0, len = self.Scope.data.length; i < len; i++) {
                var model = self.Scope.data[i];
                if (model.status)
                {
                    if ((model.montantCreditEcriture) && (Number(model.montantCreditEcriture) != 0))
                                    {
                                        credit = credit + Number(model.montantCreditEcriture);
                                    }
                                    if ((model.montantDebitEcriture) && (Number(model.montantDebitEcriture) != 0)) {
                                        debit = debit + Number(model.montantDebitEcriture);
                                    }
                }
                
            }
            self.Scope.debit = Number(debit).toFixed(3);
            self.Scope.credit = Number(credit).toFixed(3);
            self.Scope.sum = debit - credit;
            self.Scope.sum = Number(self.Scope.sum).toFixed(3);
        }
        userSetting() {
            var self = this;
            self.OperationService.getCurrentUser().then((result) => {
                self.currentUser = result;
            })
        }
        checkValue(e, index)
        {
            var self = this;
            self.value = e.target.value;
            self.Scope.leaving = false;
            self.Scope.index = index;
        }
        calculSomme(e,index) {
            var self = this;
            var newValue: number = e.target.value;
            if (self.value != newValue)
            {
                self.sum();
            }
            self.Scope.leaving = true;
        }
        save() {
            var self = this;
            var op = Number(self.Scope.debit);
            if (op == 0)
            {
                self.Scope.preventSave = "No writing accounting to save.."
                self.timeOut(() => {
                    delete self.Scope.preventSave;
                }, self.httpTranslator.timer);
            }
            else
            {
                if (self.Scope.sum != 0)
                            {
                                self.Scope.preventSave = "Your accounting writing must be balanced otherwise you can't save it"
                                self.timeOut(() => {
                                    delete self.Scope.preventSave;
                                }, self.httpTranslator.timer);
                            }
                            else
                            {
                                var self = this;
                                self.operationToSave = new app.Domain.Models.Operation('Vente', 0, new Date(), self.exerciceCode, self.numPiece, self.currentUser.idUser);
                                self.OperationService.createNewData(self.operationToSave).then((result) => {
                                    self.EcritureService.getNumEcritureGenere(self.Scope.data[0].codeJ).then((result: string) => {

                                    });
                                });
                            }
            }
            
        }
        newLine(keyEvent, index) {
            var self = this;            
            if ((keyEvent.which === 13) && (index + 1 == self.Scope.data.length))
            {               
                var model = self.Scope.data.slice(-1).pop();
                self.Scope.data[(self.Scope.data.length) - 1].status = true;
                self.Scope.data.push({});
                self.Scope.index++;
                var data = self.Scope.data.slice(-1).pop();
                self.prepareModel(data, model);
                self.Scope.validate = false;
            }
        }
        prepareModel(data,model)
        {
            data.codeJ = model.codeJ;
            data.libelleEcriture = model.libelleEcriture;
            data.reference = model.reference;
        }
         getAllAccounts(){
             var self = this;
             var valid;
            self.CompteService.displayWrittingAccounts()
                .then((result) => {
                    self.accounts = new kendo.data.ObservableArray([]);
                    self.accounts.push.apply(self.accounts,result);
                    self.Scope.Options = {
                        dataTextField: 'codeCpt',
                        dataSource: {
                            data:self.accounts,
                            schema: {
                                model: {
                                    id: "idCpt",
                                    fields: {
                                        codeCpt: { type: "string" },
                                        libelleCpt: { type: "string" }
                                    }
                                }
                            }
                        },
                        template: '#: codeCpt# #: libelleCpt#',
                        filter: "startswith",
                        placeholder: "Select account...",
                        open: function (e) {
                            valid = false;
                        },
                        change: function (e) {
                            var value = this.value();
                            if (!self.regIsNumber(value))
                                this.value('');
                            console.log(value);
                        },
                        select: function (e) {
                            valid = true;
                        },
                        close: function (e) {

                            if (!valid) {

                                this.value('');
                            }
                        }
                    }    
         });
        }

    }

    angular.module('AccountingApp')
        .controller('EntryWritingCtrl', EntryWritingCtrl);
}