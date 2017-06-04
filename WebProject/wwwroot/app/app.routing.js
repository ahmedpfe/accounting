var app;
(function (app) {
    var routing;
    (function (routing) {
        "use strict";
        var Config = (function () {
            function Config($routeProvider) {
                //this.dataService = angular.injector(['AccountingApp']).instantiate('dataService');
                $routeProvider
                    .when("/", {
                    templateUrl: "/app/Views/Accounting.html"
                })
                    .when("/settings", {
                    templateUrl: "/app/Views/Compte/DisplayPlanAccounts.html",
                    controller: "PlanAccountsCtrl as vm"
                })
                    .when("/accounts", {
                    templateUrl: "/app/Views/Compte/AccountsManagement.html",
                    controller: "UserAccountsCtrl as uac"
                })
                    .when("/sheets", {
                    templateUrl: "/app/Views/Journal/Journaux.html",
                    controller: "JournalCtrl as vm"
                })
                    .when("/exercice", {
                    templateUrl: "/app/Views/ExerciceComptable/ExerciceDefinition.html",
                    controller: "ExerciceComptaCtrl as vm"
                })
                    .when("/listOperation", {
                    templateUrl: "/app/Views/Operation/DisplayOperations.html",
                    controller: "ListOperationCtrl as vm"
                })
                    .when("/saisie", {
                    templateUrl: "/app/Views/Saisie/SaisieLibre.html",
                    controller: "EntryWritingCtrl as vm"
                    //,resolve:
                    //{
                    //    CompteService: (lesComptes) =>{
                    //        return lesComptes.displayWrittingAccounts();
                    //    }
                    //}
                    //,resolve:
                    //{
                    //    setupDate: (OperationService) => {
                    //        OperationService.getCurrentExercice();
                    //    }
                    //}
                })
                    .otherwise({ redirectTo: '/' });
            }
            return Config;
        }());
        //var dataService = angular.injector(['ng']).get('dataService');
        //Config.$inject = [dataService];
        Config.$inject = ["$routeProvider"];
        angular.module("AccountingApp").config(Config);
        //.run(["DataService", "$http", "$q"])
    })(routing = app.routing || (app.routing = {}));
})(app || (app = {}));
