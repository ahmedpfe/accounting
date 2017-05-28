var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var PlanAccountsCtrl = (function () {
            function PlanAccountsCtrl(dataService, httpTranslator, $http, $q, $scope, $timeout) {
                var _this = this;
                this.dataService = dataService;
                this.httpTranslator = httpTranslator;
                var self = this;
                self.Scope = $scope;
                self.timeOut = $timeout;
                this.intermidiateData = new Array();
                this.CompteService = new app.Services.SpecificServices.CompteFactory(dataService, "Compte", $http, $q);
                this.dataArray = new kendo.data.ObservableArray([]);
                this.gridOptions = {
                    dataSource: {
                        transport: {
                            cache: false,
                            read: function (e) {
                                _this.dataArray = new kendo.data.ObservableArray([]);
                                self.CompteService.displayAccounts().then(function (result) {
                                    _this.data = result;
                                    _this.dataArray.push.apply(_this.dataArray, _this.data);
                                    e.success(_this.dataArray);
                                    self.clearSpan();
                                }, function (error) {
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
                            headerTemplate: "<input type=\"checkbox\" id=\"header-chb\" class=\"k-checkbox\">\n                    <label class=\"k-checkbox-label\" for=\"header-chb\"></label>",
                            template: '<input type="checkbox" #= visibilityCpt ? \'checked="checked"\' : "" # class="checkbox" ng-click="vm.checkAccount(dataItem)" />', width: "10px"
                        }
                    ],
                    editable: true,
                    saveChanges: function (e) {
                        self.chainedTasks = [];
                        self.Scope.exit = false;
                        for (var i = 0; i < self.intermidiateData.length; i++) {
                            var defer = $q.defer();
                            self.chainedTasks = defer;
                            self.compte = self.intermidiateData[i];
                            self.CompteService.updateData(self.compte).then(function (result) {
                                defer.resolve();
                            }).catch(function (error) {
                                self.errorSpan();
                                self.Scope.error = self.httpTranslator.messageProvided(error.code);
                                self.Scope.exit = true;
                                $q.reject;
                            });
                        }
                        $q.all(self.chainedTasks).then(function () {
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
                    if (checked) {
                        $('.checkbox').each(function (idx, item) {
                            if (!$(this).is(":checked")) {
                                $(this).click();
                            }
                        });
                    }
                    else {
                        $('.checkbox').each(function (idx, item) {
                            if ($(this).is(":checked")) {
                                $(this).click();
                            }
                        });
                    }
                });
            }
            PlanAccountsCtrl.prototype.checkAccount = function (dataItem) {
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
            };
            PlanAccountsCtrl.prototype.errorSpan = function () {
                var self = this;
                kendo.ui.progress($("#kendoGrid"), false);
                document.getElementById("kendoGrid").style.marginBottom = "10px";
                self.timeOut(function () {
                    delete self.Scope.error;
                }, 5000);
                self.clearSpan();
            };
            PlanAccountsCtrl.prototype.successSpan = function () {
                var self = this;
                document.getElementById("kendoGrid").style.marginBottom = "10px";
                self.timeOut(function () {
                    delete self.Scope.success;
                }, 5000);
                self.clearSpan();
            };
            PlanAccountsCtrl.prototype.clearSpan = function () {
                var style = document.getElementById("kendoGrid").style;
                style.marginBottom = "";
                style.marginTop = "30px";
            };
            return PlanAccountsCtrl;
        }());
        PlanAccountsCtrl.$inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$timeout'];
        Controllers.PlanAccountsCtrl = PlanAccountsCtrl;
        angular.module('AccountingApp')
            .controller('PlanAccountsCtrl', PlanAccountsCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
