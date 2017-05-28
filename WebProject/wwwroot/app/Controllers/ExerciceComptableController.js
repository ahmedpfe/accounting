var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var ExerciceComptaCtrl = (function () {
            function ExerciceComptaCtrl(dataService, httpTranslator, $http, $q, $scope, $timeout) {
                var _this = this;
                this.dataService = dataService;
                this.httpTranslator = httpTranslator;
                var self = this;
                self.Scope = $scope;
                self.Scope.button = true;
                self.timeOut = $timeout;
                self.exerciceService = new app.Services.GenericService.Factory(dataService, "Exercice");
                this.dataArray = new kendo.data.ObservableArray([]);
                this.checkOnGoing = false;
                $scope.$watch('button', function () {
                    self.Scope.buttonText = self.Scope.button ? 'Create' : 'Update';
                });
                this.gridOptions = {
                    dataSource: {
                        transport: {
                            cache: false,
                            read: function (e) {
                                self.dataArray.empty();
                                self.exerciceService.displaydata().then(function (result) {
                                    self.data = result;
                                    /***********************/
                                    self.data.filter(function (obj) {
                                        if (obj.statusExercice == null)
                                            obj.statusExercice = "";
                                        if (obj.statusExercice.localeCompare("Ongoing") == 0)
                                            self.checkOnGoing = true;
                                    });
                                    /***********************/
                                    _this.dataArray.push.apply(self.dataArray, self.data);
                                    e.success(self.dataArray);
                                    self.clearSpan();
                                }, function (error) {
                                    self.errorSpan();
                                    self.Scope.error = httpTranslator.messageProvided(error.code);
                                });
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
                            title: 'Status',
                            width: "70px",
                            field: "statusExercice",
                            //    template: (container, options) => {
                            //        if (container.dateClotureExercice == null)
                            //            return "Ongoing";
                            //        else
                            //            return "Closed";
                            //}
                            template: function (container) {
                                if (self.checkOnGoing || (container.statusExercice.localeCompare("") != 0))
                                    return container.statusExercice;
                                else
                                    return '<button ng-click="">Ouvrir</button>';
                            }
                            //template: '#= dateClotureExercice ? "En cours" : "Cloturé" ', width: "80px"
                        },
                        {
                            field: "libelleExercice",
                            title: "Fiscal Year's Title",
                            width: "100px",
                        }, {
                            field: "dateOuvertureExercice",
                            title: "From",
                            width: "80px",
                            template: "#= kendo.toString(kendo.parseDate(dateOuvertureExercice, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
                        },
                        {
                            field: "dateFinExercice",
                            title: "Till",
                            width: "80px",
                            template: "#= kendo.toString(kendo.parseDate(dateFinExercice, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
                        },
                        {
                            title: ' ',
                            field: "ACTIONS",
                            width: '110px',
                            template: function (container, options) {
                                if (container.statusExercice.localeCompare("") == 0)
                                    //<button type="submit" ng-click="vm.Cloturer(dataItem)" class="btn btn-default">wind up</button>
                                    return '<button type="submit" ng-click="vm.UpdateYear(dataItem)" class="btn btn-default">update</button><button type="submit" ng-click="vm.Delete(dataItem)" class="btn btn-default">Delete</button>';
                                else
                                    return '';
                            }
                        }
                    ]
                };
            }
            ExerciceComptaCtrl.prototype.Cloturer = function (Exercice) {
                var self = this;
                Exercice.dateClotureExercice = new Date();
                self.exerciceService.updateData(Exercice).then(function (result) {
                    $("#kendoGrid").data("kendoGrid").dataSource.read();
                    self.flush();
                }, function (error) { });
            };
            ExerciceComptaCtrl.prototype.AddYear = function (Exercice) {
                var self = this;
                if (Exercice.idExercice) {
                    self.exerciceService.updateData(Exercice).then(function (result) {
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
                    self.exerciceService.createNewData(Exercice).then(function (result) {
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
            ExerciceComptaCtrl.prototype.flush = function () {
                var self = this;
                self.Scope.Exercice = {};
                self.Scope.post_form.$setPristine();
                self.Scope.button = true;
            };
            ExerciceComptaCtrl.prototype.UpdateYear = function (Exercice) {
                this.Scope.Exercice = Exercice;
                this.Scope.Exercice.dateOuvertureExercice = new Date(Exercice.dateOuvertureExercice);
                this.Scope.Exercice.dateFinExercice = new Date(Exercice.dateFinExercice);
                this.Scope.button = false;
            };
            ExerciceComptaCtrl.prototype.Delete = function (Exercice) {
                var self = this;
                self.exerciceService.deleteData(Exercice.idExercice).then(function () {
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
            ExerciceComptaCtrl.prototype.errorSpan = function () {
                var self = this;
                kendo.ui.progress($("#kendoGrid"), false);
                document.getElementById("kendoGrid").style.marginBottom = "10px";
                self.timeOut(function () {
                    delete self.Scope.error;
                }, self.httpTranslator.timer);
                self.clearSpan();
            };
            ExerciceComptaCtrl.prototype.clearSpan = function () {
                var style = document.getElementById("kendoGrid").style;
                style.marginBottom = "";
                style.marginTop = "30px";
            };
            return ExerciceComptaCtrl;
        }());
        ExerciceComptaCtrl.$inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$timeout'];
        Controllers.ExerciceComptaCtrl = ExerciceComptaCtrl;
        angular.module('AccountingApp')
            .controller('ExerciceComptaCtrl', ExerciceComptaCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
