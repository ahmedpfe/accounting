module app.Controllers {

    interface IExerciceCtrl {
        data: app.Domain.Models.IExerciceComptable[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        exerciceService: app.Services.GenericService.Factory;
    }
    export class ExerciceComptaCtrl implements IExerciceCtrl {
        data: app.Domain.Models.IExerciceComptable[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        exerciceService: app.Services.GenericService.Factory;
        Scope: ng.IScope;
        timeOut: ng.ITimeoutService;
        checkOnGoing: boolean;
        static $inject = ['dataService', 'httpTranslator', '$http', '$q', '$scope', '$timeout']
        constructor(private dataService: app.Common.DataService, private httpTranslator: app.Exceptions.Common.HttpTranslator, $http: ng.IHttpService, $q: ng.IQService, $scope: ng.IScope, $timeout: ng.ITimeoutService) {
            var self = this;
            self.Scope = $scope;
            self.Scope.button = true;
            self.timeOut = $timeout;
            self.exerciceService = new app.Services.GenericService.Factory(dataService, "Exercice");
            this.dataArray = new kendo.data.ObservableArray([]);
            this.checkOnGoing = false;
            $scope.$watch('button', function () {
                self.Scope.buttonText = self.Scope.button ? 'Create' : 'Update';
            })

            this.gridOptions = {
                dataSource: {
                    transport: {
                        cache: false,
                        read: (e) => {
                            self.dataArray.empty();
                            self.exerciceService.displaydata().then((result: app.Domain.Models.ExerciceComptable[]) => {
                                self.data = result;
                                /***********************/
                                self.data.filter((obj) => {
                                    if (obj.statusExercice == null)
                                        obj.statusExercice = "";
                                    if (obj.statusExercice.localeCompare("Ongoing") == 0)
                                        self.checkOnGoing = true;
                                });
                                /***********************/
                                this.dataArray.push.apply(self.dataArray, self.data);
                                e.success(self.dataArray);
                                self.clearSpan();
                            }, (error: app.Exceptions.Model.IException) => {
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
                        template: (container) => {
                            if ( self.checkOnGoing || (container.statusExercice.localeCompare("") != 0))
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
                    }
                    ,
                    {
                        title: ' ',
                        field: "ACTIONS",
                        width: '110px',
                        template: (container, options) => {
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
        Cloturer(Exercice: app.Domain.Models.ExerciceComptable) {
            var self = this;
            Exercice.dateClotureExercice = new Date();
            self.exerciceService.updateData(Exercice).then((result: app.Domain.Models.ExerciceComptable) => {
                $("#kendoGrid").data("kendoGrid").dataSource.read();
                self.flush();
            }, (error) => { });
        }
        AddYear(Exercice: app.Domain.Models.ExerciceComptable) {
            var self = this;
            if (Exercice.idExercice) {
                self.exerciceService.updateData(Exercice).then((result: app.Domain.Models.ExerciceComptable) => {
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
                self.exerciceService.createNewData(Exercice).then((result: app.Domain.Models.ExerciceComptable) => {
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
        flush() {
            var self = this;
            self.Scope.Exercice = {};
            self.Scope.post_form.$setPristine();
            self.Scope.button = true;

        }
        UpdateYear(Exercice: app.Domain.Models.ExerciceComptable) {
            this.Scope.Exercice = Exercice;
            this.Scope.Exercice.dateOuvertureExercice = new Date(Exercice.dateOuvertureExercice);
            this.Scope.Exercice.dateFinExercice = new Date(Exercice.dateFinExercice);
            this.Scope.button = false;
        }
        Delete(Exercice: app.Domain.Models.ExerciceComptable) {
            var self = this;
            self.exerciceService.deleteData(Exercice.idExercice).then(() => {
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
        .controller('ExerciceComptaCtrl', ExerciceComptaCtrl);
}