var app;
(function (app) {
    var compiling;
    (function (compiling) {
        "use strict";
        var Config = (function () {
            function Config($compileProvider, $logProvider) {
                $compileProvider.debugInfoEnabled(false);
                $logProvider.debugEnabled(false);
            }
            return Config;
        }());
        Config.$inject = ["$compileProvider", "$logProvider"];
        angular.module("AccountingApp").config(Config);
    })(compiling = app.compiling || (app.compiling = {}));
})(app || (app = {}));
