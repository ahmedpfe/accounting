module app.Controllers.Ecritures {
    interface IListOperation {
        OperationService: app.Services.SpecificServices.OperationFactory;

    }
    export class ListOperationCtrl implements IListOperation {
        Scope: ng.IScope;
        data: app.Domain.Models.IOperation[];
        writingData: app.Domain.Models.IEcriture[];
        dataArray: kendo.data.ObservableArray;
        gridOptions: kendo.ui.GridOptions;
        mydataOptions: kendo.data.ObservableArray;
        OperationService: app.Services.SpecificServices.OperationFactory;
        static $inject = ['dataService','$scope','$http','$q'];
        constructor(private dataService: app.Common.DataService, $scope: ng.IScope, public $http: ng.IHttpService, public $q: ng.IQService)
        {
            var self = this;
            self.Scope = $scope;
            self.dataArray = new kendo.data.ObservableArray([]);
            self.OperationService = new app.Services.SpecificServices.OperationFactory(dataService, "Operation", $http, $q);
            self.Scope.$watch('opId', () => {
                var grid = $("#kendoGrid");
                var $filter = new Array();
                if (self.Scope.opId)
                {
                    $filter.push({ field: "numPieceJustificatifOp", operator: "eq", value: self.Scope.opId });
                    grid.data("kendoGrid").dataSource.filter($filter);
                }
            });

            self.Scope.$watchGroup(['DateBegin', 'DateEnd'], () => {
                if (self.Scope.DateBegin && self.Scope.DateEnd)
                {
                    self.dataArray = new kendo.data.ObservableArray([]);
                    self.Scope.vucher = [];
                    console.log("Begin: " + self.Scope.DateBegin + " END : " + self.Scope.DateEnd);
                    self.OperationService.getRequestedOp(self.Scope.DateBegin, self.Scope.DateEnd).then((Operations: app.Domain.Models.Operation[]) => {
                           angular.forEach(Operations, (op) => {
                                  self.Scope.vucher.push(op.numPieceJustificatifOp);
                            });
                    });
                    self.OperationService.getRequestedOpWithDetails(self.Scope.DateBegin, self.Scope.DateEnd).then((result ) => {
                        self.dataArray.push.apply(self.dataArray, result);     
                        var grid = $("#kendoGrid").data("kendoGrid");
                        grid.dataSource.data(self.dataArray);
                        grid.refresh(); 
                    });

                }
                
            });

            this.gridOptions = {
                dataSource: {
                    data: self.dataArray,
                    schema: {
                        model: {
                            fields: {
                                dateOp: { type: "string" },
                                numPieceJustificatifOp: { type: "string" }
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
                        field: "dateOp",
                        title: "Date Operation",
                        width: "80px",
                        template: "#= kendo.toString(kendo.parseDate(dateOp, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
                        filterable: {
                            cell: {
                                showOperators: false,
                                operator: "startswith"
                            }
                        }
                    }, {
                        field: "libelleOp",
                        title: "Libelle ",
                        width: "130px",
                        filterable: {
                            cell: {
                                showOperators: false,
                                operator: "contains"
                            }
                        }
                    },{
                        field: "numPieceJustificatifOp",
                        title: "N° Piece",
                        width: "60px",
                        filterable: {
                            cell: {
                                showOperators: false,
                                operator: "startswith"
                            }
                        }
                    }, {
                        field: "montantOp",
                        title: "Montant",
                        width: "60px",
                        filterable: false
                    }
                ]
            };
        }

        detailGridOptions = function (dataItem) {

            var self = this;
            self.mydataOptions = new kendo.data.ObservableArray([]);
            self.mydataOptions.push.apply(self.mydataOptions, dataItem.ecritureComptable);
            angular.forEach(self.mydataOptions, (data: app.Domain.Models.IEcriture, key) => {
                if (Number(key) != 0)
                    data.numSequenceEcriture = null;
            });
            return {
                dataSource: self.mydataOptions,
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    {
                        field: "journal", title: "Journal", width: "60px"
                    },
                    { field: "numSequenceEcriture", title: "N° Ecriture", width: "70px" },
                    { field: "libelleEcriture", title: "Libélle Ecriture", width: "80px" },
                    { field: "reference", title: "Référence", width: "60px" },
                    { field: "compte", title: "Compte", width: "60px" },
                    { field: "montantDebitEcriture", title: "Débit", width: "60px" },
                    { field: "montantCreditEcriture", title: "Crédit", width: "60px"  }
                ]
            };
        };
        
    }

    angular.module('AccountingApp')
        .controller('ListOperationCtrl', ListOperationCtrl);
}