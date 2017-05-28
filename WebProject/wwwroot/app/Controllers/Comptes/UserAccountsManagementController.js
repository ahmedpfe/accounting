var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserAccountsCtrl = (function () {
            function UserAccountsCtrl(dataService, httpTranslator, $http, $q, $scope, $rootScope, $root, $timeout) {
                var _this = this;
                this.dataService = dataService;
                this.httpTranslator = httpTranslator;
                this.Max = 8;
                this.selectedAccount = function (selected) {
                    if (selected) {
                        _this.AccountChosen = selected.originalObject;
                        if (String(_this.AccountChosen.codeCpt).length == _this.Max) {
                            $('#libelle').val(_this.AccountChosen.libelleCpt);
                            $('#idCpt').val(String(_this.AccountChosen.idCpt));
                            _this.Scope.button = false;
                        }
                    }
                };
                this.check = function (selected) {
                    var self = _this;
                    if (((String(selected).length == _this.Max) && (_this.AccountChosen) && !$('#libelle').val()) || (String(selected).length == _this.Max) && ((!_this.AccountChosen) || ((!_this.AccountChosen.codeCpt) && (String(_this.AccountChosen).localeCompare(selected) != 0)) || ((_this.AccountChosen.codeCpt) && (String(_this.AccountChosen.codeCpt).localeCompare(selected) != 0)))) {
                        var _entity = void 0;
                        self.CompteService.GetSpecificData(selected).then(function (result) {
                            _this.AccountChosen = result;
                            $('#libelle').val(_this.AccountChosen.libelleCpt);
                            $('#idCpt').val(_this.AccountChosen.idCpt);
                            _this.Scope.button = false;
                        }, function (error) { });
                    }
                    else {
                        _this.Scope.button = true;
                    }
                    console.log("compte finale " + selected);
                };
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
                });
                this.gridOptions = {
                    dataSource: {
                        transport: {
                            cache: false,
                            read: function (e) {
                                _this.dataArray.empty();
                                self.CompteService.displayAllDefinedAccounts().then(function (result) {
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
            UserAccountsCtrl.prototype.AddCompte = function (compte) {
                var self = this;
                var TEMPLATE_URL = '/angucomplete-alt/index.html';
                if (!$('#idCpt').val()) 
                //create
                {
                    self.CompteService.createNewUserAccount(compte).then(function (result) {
                        $("#kendoGrid").data("kendoGrid").dataSource.read();
                        self.AllAccounts.push(result);
                        self.Scope.form_success = self.httpTranslator.successMessage("creation");
                        self.timeOut(function () {
                            delete self.Scope.form_success;
                        }, self.httpTranslator.timer);
                        //self.root.reloadDirectives('/angucomplete-alt/index.html')               
                    }, function (error) {
                        self.Scope.form_failure = self.httpTranslator.failedMessage("creation");
                        self.timeOut(function () {
                            delete self.Scope.form_failure;
                        }, self.httpTranslator.timer);
                    });
                }
                else {
                    self.AccountChosen.libelleCpt = compte.libelleCpt;
                    console.log("updated entity " + JSON.stringify(self.AccountChosen));
                    self.CompteService.updateData(self.AccountChosen).then(function (result) {
                        $("#kendoGrid").data("kendoGrid").dataSource.read();
                        self.Scope.form_success = self.httpTranslator.successMessage("update");
                        self.timeOut(function () {
                            delete self.Scope.form_success;
                        }, self.httpTranslator.timer);
                    }, function (error) {
                        self.Scope.form_failure = self.httpTranslator.failedMessage("update");
                        self.timeOut(function () {
                            delete self.Scope.form_failure;
                        }, self.httpTranslator.timer);
                    });
                }
                self.flush();
                kendo.ui.progress($("#kendoGrid"), false);
            };
            UserAccountsCtrl.prototype.retrieveAllAccounts = function () {
                var self = this;
                self.CompteService.displayAllDefinedAccounts().then(function (result) {
                    self.AllAccounts.push.apply(self.AllAccounts, result);
                }, function (error) { });
            };
            UserAccountsCtrl.prototype.flush = function () {
                $('#libelle').val('');
                $('#idCpt').val('');
                this.Scope.$broadcast('angucomplete-alt:clearInput');
                this.AccountChosen = null;
                this.Scope.button = true;
            };
            UserAccountsCtrl.prototype.errorSpan = function () {
                var self = this;
                kendo.ui.progress($("#kendoGrid"), false);
                document.getElementById("kendoGrid").style.marginBottom = "10px";
                self.timeOut(function () {
                    delete self.Scope.error;
                }, self.httpTranslator.timer);
                self.clearSpan();
            };
            UserAccountsCtrl.prototype.clearSpan = function () {
                var style = document.getElementById("kendoGrid").style;
                style.marginBottom = "";
                style.marginTop = "30px";
            };
            return UserAccountsCtrl;
        }());
        UserAccountsCtrl.$inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$rootScope', '$route', '$timeout'];
        Controllers.UserAccountsCtrl = UserAccountsCtrl;
        angular.module('AccountingApp')
            .controller('UserAccountsCtrl', UserAccountsCtrl);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
