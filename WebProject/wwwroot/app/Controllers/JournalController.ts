module app.Controllers {

    
    interface IJournalCtrl {
        data: app.Domain.Models.IJournal[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        journalService: app.Services.GenericService.Factory;
    }
    export class JournalCtrl implements IJournalCtrl {
        data: app.Domain.Models.IJournal[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        journalService: app.Services.GenericService.Factory;
        Scope: ng.IScope;
        timeOut: ng.ITimeoutService;
        static $inject = ['dataService','httpTranslator', '$http', '$q', '$scope', '$timeout']
        constructor(private dataService: app.Common.DataService, private httpTranslator: app.Exceptions.Common.HttpTranslator, $http: ng.IHttpService, $q: ng.IQService, $scope: ng.IScope, $timeout: ng.ITimeoutService) {
            var self = this;
            self.Scope = $scope;
            self.Scope.button = true;
            self.timeOut = $timeout;
            self.Scope.pattern = ['yyyy-Prefix', 'mm-yyyy-Prefix', 'dd-mm-yyyy-Prefix'];
            self.journalService = new app.Services.GenericService.Factory(dataService, "Journal");
            this.dataArray = new kendo.data.ObservableArray([]);
            $scope.$watch('button', function () {
                self.Scope.buttonText = self.Scope.button ? 'Create' : 'Update';
            })

            this.gridOptions = {
                dataSource: {
                    transport: {
                        cache: false,
                        read: (e) => {
                            self.dataArray.empty();
                            self.journalService.displaydata().then((result: app.Domain.Models.Journal[]) => {
                                self.data = result;
                                this.dataArray.push.apply(self.dataArray, self.data);
                                e.success(self.dataArray);
                                self.clearSpan();
                            }, (error: app.Exceptions.Model.IException) => {
                                self.errorSpan();
                                self.Scope.error = httpTranslator.messageProvided(error.code);
                            });
                        }
                    },
                    schema: {
                        model: {
                            id: "codeJournal",
                            fields: {
                                libelleJournal: { type: "string" },
                                prefixJournal: { type: "string" }
                            }
                        }
                    }
                },
                filterable: false,
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
                        field: "prefixJournal",
                        title: "Prefix Journal",
                        width: "45px",                      
                    }, {
                        field: "libelleJournal",
                        title: "Libelle Journal",
                        width: "130px",                     
                    },
                    {
                        template: '<button type="submit" ng-click="vm.UpdateSheet(dataItem)" class="btn btn-default">update</button><button type="submit" ng-click="vm.Delete(dataItem)" class="btn btn-default">delete</button>', width: '80px'
                    }    
                ]
            };
            
        }

        AddSheet(Sheet: app.Domain.Models.Journal) {
            var self = this;
            if (Sheet.codeJournal) {
                self.journalService.updateData(Sheet).then((result: app.Domain.Models.Journal) => {
                    self.Scope.form_success = self.httpTranslator.successMessage("update");
                    self.timeOut(() => {
                        delete self.Scope.form_success;
                    }, self.httpTranslator.timer);
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.flush();
                }, (error) => {
                    self.Scope.form_failure = self.httpTranslator.failedMessage("update");
                    self.timeOut(() => {
                        delete self.Scope.form_failure;
                    }, self.httpTranslator.timer);
                    });
            }
            else {
                self.journalService.createNewData(Sheet).then((result: app.Domain.Models.Journal) => {
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.Scope.form_success = self.httpTranslator.successMessage("creation");
                    self.timeOut(() => {
                        delete self.Scope.form_success;
                    }, self.httpTranslator.timer);
                    self.flush();
                }, (error) => {
                    self.Scope.form_failure = self.httpTranslator.failedMessage("creation");
                    self.timeOut(() => {
                        delete self.Scope.form_failure;
                    }, self.httpTranslator.timer);
                    });
            }
           
        }
        Delete(Sheet: app.Domain.Models.Journal) {
            var self = this;
            self.journalService.deleteData(Sheet.codeJournal).then((result: app.Domain.Models.Journal) => {
                $("#kendoGrid").data("kendoGrid").dataSource.read();
                self.Scope.form_success = self.httpTranslator.successMessage("delete");
                self.timeOut(() => {
                    delete self.Scope.form_success;
                }, self.httpTranslator.timer);
            }, (error) => {
                self.Scope.form_failure = self.httpTranslator.failedMessage("delete");
                self.timeOut(() => {
                    delete self.Scope.form_failure;
                }, self.httpTranslator.timer);
                });
        }
        flush() {
            var self = this;
            self.Scope.Sheet = {};
            self.Scope.post_form.$setPristine();
            self.Scope.button = true;
            
        }
        UpdateSheet(Sheet) {
            console.log(JSON.stringify(Sheet));
            this.Scope.Sheet = Sheet;
            this.Scope.button = false;
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
        .controller('JournalCtrl', JournalCtrl);
}