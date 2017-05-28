module app.Controllers {
    interface IUserAccountsModel {
        data: app.Domain.Models.ICompte[];
        dataArray: kendo.data.ObservableArray;
        dataArrayOptions: kendo.data.ObservableArray;
        CompteService: app.Services.GenericService.Factory;
        gridOptions: kendo.ui.GridOptions;
        trueOrfalse: boolean;
        Max: number;
        check(selected): void;
        selectedAccount(selected): void;
        AccountChosen: any;
        AllAccounts: Array<app.Domain.Models.ICompte>;
        retrieveAllAccounts(): void;
        AddCompte(compte): void;
        Scope: ng.IScope;
    }
    export class UserAccountsCtrl implements IUserAccountsModel {
        data: app.Domain.Models.ICompte[];
        dataArray: kendo.data.ObservableArray;
        dataArrayOptions: kendo.data.ObservableArray;
        CompteService: app.Services.SpecificServices.CompteFactory;
        gridOptions: kendo.ui.GridOptions;
        trueOrfalse: boolean;
        Max: number = 8;
        title: string;
        AllAccounts: Array<app.Domain.Models.ICompte>;
        AccountChosen: any;
        Scope: ng.IScope;
        rootScope: ng.IRootScopeService;
        timeOut: ng.ITimeoutService;
        root;
        static $inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$rootScope', '$route', '$timeout'];
        constructor(private dataService: app.Common.DataService, private httpTranslator: app.Exceptions.Common.HttpTranslator, $http: ng.IHttpService, $q: ng.IQService, $scope: ng.IScope, $rootScope: ng.IRootScopeService, $root, $timeout: ng.ITimeoutService) {
            var self = this;
            self.Scope = $scope;
            self.timeOut = $timeout;
            self.root = $root;
            self.rootScope = $rootScope;
            self.trueOrfalse = false;
            self.Scope.button = true;
            this.AllAccounts = [];
            this.Scope.listAccounts = [];
            this.CompteService = new app.Services.SpecificServices.CompteFactory(dataService, "Compte", $http, $q);
            this.dataArray = new kendo.data.ObservableArray([]);
            self.retrieveAllAccounts();
            self.Scope.listAccounts = self.AllAccounts;
            $scope.$watch('button', function () {
                self.Scope.buttonText = self.Scope.button ? 'Create' : 'Update';
            })
            this.gridOptions = {
                dataSource: {
                    transport: {
                        cache: false,
                        read: (e) => {
                            this.dataArray.empty();
                            self.CompteService.displayAllDefinedAccounts().then((result) => {
                                this.data = <app.Domain.Models.ICompte[]>result;
                                this.dataArray.push.apply(this.dataArray, this.data);
                                e.success(this.dataArray);
                                self.clearSpan();
                            }, (error: app.Exceptions.Model.IException) => {
                                self.errorSpan();
                                self.Scope.error = httpTranslator.messageProvided(error.code);
                            });
                        }
                    },
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
                filterable: {
                    mode: "row"
                },
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSize: 10
                },
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },     
                columns: [
                    {
                        field: "codeCpt",
                        title: "Code Compte",
                        width: "25px",
                        filterable: {
                            cell: {
                                showOperators: false,
                                operator: "startswith",
                                minLength: 3000                                
                            }
                        }
                    }, {
                        field: "libelleCpt",
                        title: "Libelle Compte",
                        width: "120px",
                        filterable: {
                            cell: {
                                showOperators: false,
                                operator: "contains",
                                minLength: 3000
                            }
                        }
                    }                  
                ]
            };
           
        }
        AddCompte(compte) {
            var self = this;
            var TEMPLATE_URL = '/angucomplete-alt/index.html';
            if (!$('#idCpt').val())
            //create
            {
                self.CompteService.createNewUserAccount(compte).then((result) => {
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.AllAccounts.push(result);
                    self.Scope.form_success = self.httpTranslator.successMessage("creation");
                    self.timeOut(() => {
                        delete self.Scope.form_success;
                    }, self.httpTranslator.timer);
                    //self.root.reloadDirectives('/angucomplete-alt/index.html')               
                }, (error) => {
                    self.Scope.form_failure = self.httpTranslator.failedMessage("creation");
                    self.timeOut(() => {
                        delete self.Scope.form_failure;
                    }, self.httpTranslator.timer);
                    });
            }
            // update
            else {
                self.AccountChosen.libelleCpt = compte.libelleCpt;
                console.log("updated entity " + JSON.stringify(self.AccountChosen));
                self.CompteService.updateData(self.AccountChosen).then((result) => {
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.Scope.form_success = self.httpTranslator.successMessage("update");
                    self.timeOut(() => {
                        delete self.Scope.form_success;
                    }, self.httpTranslator.timer);
                }, (error) => {
                    self.Scope.form_failure = self.httpTranslator.failedMessage("update");
                    self.timeOut(() => {
                        delete self.Scope.form_failure;
                    }, self.httpTranslator.timer);
                    });
            }
            self.flush();
            kendo.ui.progress($("#kendoGrid"), false);
        }
        retrieveAllAccounts(){
            var self = this;
            self.CompteService.displayAllDefinedAccounts().then((result) => {
                self.AllAccounts.push.apply(self.AllAccounts, <app.Domain.Models.ICompte[]>result);
            }, (error) => { });
        }
        selectedAccount=(selected)=>{

            if (selected) {               
                this.AccountChosen = selected.originalObject;
                if (String(this.AccountChosen.codeCpt).length == this.Max) {
                    $('#libelle').val(this.AccountChosen.libelleCpt);
                    $('#idCpt').val(String(this.AccountChosen.idCpt));
                    this.Scope.button = false;
                }             
            }
        }
        flush() {
            $('#libelle').val('');
            $('#idCpt').val('');
            this.Scope.$broadcast('angucomplete-alt:clearInput');
            this.AccountChosen = null;
            this.Scope.button = true;
        }
        check=(selected)=>{
            var self = this;
            if (((String(selected).length == this.Max) && (this.AccountChosen) && !$('#libelle').val())||(String(selected).length == this.Max) && ((!this.AccountChosen) || ((!this.AccountChosen.codeCpt) && (String(this.AccountChosen).localeCompare(selected) != 0)) || ((this.AccountChosen.codeCpt) && (String(this.AccountChosen.codeCpt).localeCompare(selected) != 0)))) {
                let _entity;
                self.CompteService.GetSpecificData(selected).then((result) => {
                    this.AccountChosen = result;
                    $('#libelle').val(this.AccountChosen.libelleCpt);
                    $('#idCpt').val(this.AccountChosen.idCpt);
                    this.Scope.button = false;
                }, (error) => { });

            }
            else {
                
                this.Scope.button = true;
            }
            console.log("compte finale " + selected);
        }
        errorSpan() {
            var self = this;
            kendo.ui.progress($("#kendoGrid"), false);
            document.getElementById("kendoGrid").style.marginBottom = "10px";
            self.timeOut(() => {
                delete self.Scope.error;
            }, self.httpTranslator.timer);
            self.clearSpan();
        }
        clearSpan() {
            let style = document.getElementById("kendoGrid").style;
            style.marginBottom = "";
            style.marginTop = "30px";
        }  
            
    }

    angular.module('AccountingApp')
        .controller('UserAccountsCtrl', UserAccountsCtrl);
}