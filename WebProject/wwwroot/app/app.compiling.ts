module app.compiling {
    "use strict";
    class Config {
        constructor($compileProvider: ng.ICompileProvider, $logProvider: ng.ILogProvider) {
            $compileProvider.debugInfoEnabled(false);
            $logProvider.debugEnabled(false);
        }
        
    }
    Config.$inject = ["$compileProvider","$logProvider"];
    angular.module("AccountingApp").config(Config);
}

