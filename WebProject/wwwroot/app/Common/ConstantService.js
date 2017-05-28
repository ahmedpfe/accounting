var app;
(function (app) {
    var Common;
    (function (Common) {
        var ConstantService = (function () {
            function ConstantService(entity) {
                this.entity = entity;
                this.apiPostURI = '/api/' + entity + '/';
            }
            return ConstantService;
        }());
        Common.ConstantService = ConstantService;
        angular.module('AccountingApp')
            .service('constantService', ConstantService);
    })(Common = app.Common || (app.Common = {}));
})(app || (app = {}));
