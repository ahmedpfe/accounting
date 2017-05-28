module app.Controllers {
    interface IPlanAccountsModel {
        data: app.Domain.Models.ICompte[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions; 
        checkAccount(dataItem): void;
    }
    export class PlanAccountsCtrl implements IPlanAccountsModel {
        data: app.Domain.Models.ICompte[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        intermidiateData: Array<app.Domain.Models.Compte>;
        activated: boolean;
        compte: app.Domain.Models.Compte;
        checkExist: boolean;
        CompteService: app.Services.SpecificServices.CompteFactory;
        Scope: ng.IScope;
        timeOut: ng.ITimeoutService;
        chainedTasks;
        static $inject = ['dataService','httpTranslator','$http', '$q', '$scope', '$timeout'];
        constructor(private dataService: app.Common.DataService, private httpTranslator: app.Exceptions.Common.HttpTranslator, $http: ng.IHttpService, $q: ng.IQService, $scope: ng.IScope, $timeout: ng.ITimeoutService)
        {
            var self = this;
            self.Scope = $scope;
            self.timeOut = $timeout;
            this.intermidiateData = new Array();
            this.CompteService = new app.Services.SpecificServices.CompteFactory(dataService, "Compte", $http, $q );
            this.dataArray = new kendo.data.ObservableArray([]);
            this.gridOptions = {
                dataSource: {
                    transport: {
                        cache : false,
                        read: (e) => {
                            this.dataArray = new kendo.data.ObservableArray([]);
                            self.CompteService.displayAccounts().then((result) => {
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
                                codeCpt: { editable: false },
                                libelleCpt: { editable: false },
                              
                            }
                        }
                    }
                },
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSize: 10
                },
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                toolbar: ["save", "cancel"
                ],
                columns: [                   
                    {                    
                    field: "codeCpt",
                    title: "Code Compte",
                    width: "18px"                    
                }, {
                    field: "libelleCpt",
                    title: "Libelle Compte",
                    width: "120px"
                    },
                {
                    title: 'Select All',
                    headerTemplate: `<input type="checkbox" id="header-chb" class="k-checkbox">
                    <label class="k-checkbox-label" for="header-chb"></label>`,
                    template: '<input type="checkbox" #= visibilityCpt ? \'checked="checked"\' : "" # class="checkbox" ng-click="vm.checkAccount(dataItem)" />', width: "10px"
                }        
                ],
                editable: true,
                saveChanges:  (e) =>{                   
                    self.chainedTasks = [];
                    self.Scope.exit = false;
                    for (var i = 0; i < self.intermidiateData.length; i++) {
                        var defer = $q.defer();
                        self.chainedTasks = defer;
                        self.compte = <app.Domain.Models.Compte>self.intermidiateData[i];
                        self.CompteService.updateData(self.compte).then((result) => {
                            defer.resolve();
                        }).catch((error: app.Exceptions.Model.IException) => {
                            self.errorSpan();
                            self.Scope.error = self.httpTranslator.messageProvided(error.code);
                            self.Scope.exit = true;
                            $q.reject;
                        });
                    }
                    $q.all(self.chainedTasks).then(() => {
                        if (!self.Scope.exit) {
                            self.successSpan();
                            self.Scope.success = httpTranslator.successMessage("update");
                            $("#kendoGrid").data("kendoGrid").dataSource.read();
                            self.intermidiateData = new Array();
                        }     
                    });
                           
                }
            };

            $("#kendoGrid").on("click", ".k-grid-cancel-changes", function (e) {
                $("#kendoGrid").data("kendoGrid").dataSource.read();
            });

            $("#kendoGrid").on("click", "#header-chb", function (e) {
                self.intermidiateData = new Array();
                var checked = $('#header-chb').is(":checked");           
                if (checked)
                {
                    $('.checkbox').each(function (idx, item) {
                        if (!$(this).is(":checked")) {
                            $(this).click();
                        }
                    })
                } else
                {
                    $('.checkbox').each(function (idx, item)
                    {
                        if ($(this).is(":checked")) {
                            $(this).click();
                        }
                    })
                }
            })         
        }

        checkAccount(dataItem) {
            this.checkExist = false;            
            for (var i = 0; i < this.intermidiateData.length; i++) {   
                this.compte = this.intermidiateData[i];
                if (this.compte.codeCpt == dataItem.codeCpt) {
                    this.intermidiateData.splice(i, 1);
                    this.checkExist = true;
                }
            }
            if (!this.checkExist) {
                dataItem.visibilityCpt = !dataItem.visibilityCpt;            
                this.intermidiateData.push(dataItem);
            }
        }
        errorSpan() {
            var self = this;
            kendo.ui.progress($("#kendoGrid"), false);
            document.getElementById("kendoGrid").style.marginBottom = "10px";
            self.timeOut(() => {
                delete self.Scope.error;
            }, 5000);
            self.clearSpan();
        }
        successSpan() {
            var self = this;
            document.getElementById("kendoGrid").style.marginBottom = "10px";
            self.timeOut(() => {
                delete self.Scope.success;
            }, 5000);
            self.clearSpan();
        }
        clearSpan() {
            let style = document.getElementById("kendoGrid").style;
            style.marginBottom = "";
            style.marginTop = "30px";
        } 
        
    }
    angular.module('AccountingApp')
        .controller('PlanAccountsCtrl', PlanAccountsCtrl);
}