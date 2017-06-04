var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var JournalCtrl = (function () {
            function JournalCtrl(dataService, httpTranslator, $http, $q, $scope, $timeout) {
                var _this = this;
                this.dataService = dataService;
                this.httpTranslator = httpTranslator;
                var self = this;
                self.Scope = $scope;
                self.Scope.button = true;
                self.timeOut = $timeout;
                self.Scope.pattern = ['yyyy-N°Seq', 'mm-yyyy-N°Seq', 'dd-mm-yyyy-N°Seq'];
                self.journalService = new app.Services.GenericService.Factory(dataService, "Journal");
                this.dataArray = new kendo.data.ObservableArray([]);
                $scope.$watch('button', function () {
                    self.Scope.buttonText = self.Scope.button ? 'Create' : 'Update';
                });
                this.gridOptions = {
                    dataSource: {
                        transport: {
                            cache: false,
                            read: function (e) {
                                self.dataArray.empty();
                                self.journalService.displaydata().then(function (result) {
                                    self.data = result;
                                    _this.dataArray.push.apply(self.dataArray, self.data);
                                    e.success(self.dataArray);
                                    self.clearSpan();
                                }, function (error) {
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
            JournalCtrl.prototype.AddSheet = function (Sheet) {
                var self = this;
                if (Sheet.codeJournal) {
                    self.journalService.updateData(Sheet).then(function (result) {
                        self.Scope.form_success = self.httpTranslator.successMessage("update");
                        self.timeOut(function () {
                            delete self.Scope.form_success;
                        }, self.httpTranslator.timer);
                        $("#kendoGrid").data("kendoGrid").dataSource.read();
                        self.flush();
                    }, function (error) {
                        self.Scope.form_failure = self.httpTranslator.failedMessage("update");
                        self.timeOut(function () {
                            delete self.Scope.form_failure;
                        }, self.httpTranslator.timer);
                    });
                }
                else {
                    self.journalService.createNewData(Sheet).then(function (result) {
                        $("#kendoGrid").data("kendoGrid").dataSource.read();
                        self.Scope.form_success = self.httpTranslator.successMessage("creation");
                        self.timeOut(function () {
                            delete self.Scope.form_success;
                        }, self.httpTranslator.timer);
                        self.flush();
                    }, function (error) {
                        self.Scope.form_failure = self.httpTranslator.failedMessage("creation");
                        self.timeOut(function () {
                            delete self.Scope.form_failure;
                        }, self.httpTranslator.timer);
                    });
                }
            };
            JournalCtrl.prototype.Delete = function (Sheet) {
                var self = this;
                self.journalService.deleteData(Sheet.codeJournal).then(function (result) {
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.Scope.form_success = self.httpTranslator.successMessage("delete");
                    self.timeOut(function () {
                        delete self.Scope.form_success;
                    }, self.httpTranslator.timer);
                }, function (error) {
                    self.Scope.form_failure = self.httpTranslator.failedMessage("delete");
                    self.timeOut(function () {
                        delete self.Scope.form_failure;
                    }, self.httpTranslator.timer);
                });
            };
            JournalCtrl.prototype.flush = function () {
                var self = this;
                self.Scope.Sheet = {};
                self.Scope.post_form.$setPristine();
                self.Scope.button = true;
            };
            JournalCtrl.prototype.UpdateSheet = function (Sheet) {
                console.log(JSON.stringify(Sheet));
                this.Scope.Sheet = Sheet;
                this.Scope.button = false;
            };
            JournalCtrl.prototype.errorSpan = function () {
                var self = this;
                kendo.ui.progress($("#kendoGrid"), false);
                document.getElementById("kendoGrid").style.marginBottom = "10px";
                self.timeOut(function () {
                    delete self.Scope.error;
                }, self.httpTranslator.timer);
                self.clearSpan();
            };
            JournalCtrl.prototype.clearSpan = function () {
                var style = document.getElementById("kendoGrid").style;
                style.marginBottom = "";
                style.marginTop = "30px";
            };
            return JournalCtrl;
        }());
        JournalCtrl.$inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$timeout'];
        Controllers.JournalCtrl = JournalCtrl;
        angular.module('AccountingApp')
            .controller('JournalCtrl', JournalCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
