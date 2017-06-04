var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app;
(function (app) {
    var Services;
    (function (Services) {
        var SpecificServices;
        (function (SpecificServices) {
            var OperationFactory = (function (_super) {
                __extends(OperationFactory, _super);
                function OperationFactory(dataService, entity, $http, $q) {
                    var _this = _super.call(this, dataService, entity) || this;
                    _this.dataService = dataService;
                    _this.httpService = $http;
                    _this.qService = $q;
                    _this.numPJ = "pj";
                    _this.currentExercice = _this.constantService.apiPostURI.replace(entity, "Exercice").concat("CurrentExercice");
                    _this.currentUser = _this.constantService.apiPostURI.replace(entity, "User");
                    return _this;
                }
                OperationFactory.prototype.getCurrentExercice = function () {
                    return this.dataService.getSingle(this.currentExercice);
                };
                OperationFactory.prototype.getnombrePj = function () {
                    return this.dataService.getNumber(this.constantService.apiPostURI.concat(this.numPJ));
                };
                OperationFactory.prototype.getCurrentUser = function () {
                    return this.dataService.getSingle(this.currentUser);
                };
                OperationFactory.prototype.getRequestedOp = function (begin, end) {
                    var rq = "Rq/";
                    var parameters = begin.concat('/' + end);
                    return this.dataService.get(this.constantService.apiPostURI.concat(rq).concat(parameters));
                };
                OperationFactory.prototype.getRequestedOpWithDetails = function (begin, end) {
                    var rq = "RqAll/";
                    var parameters = begin.concat('/' + end);
                    return this.dataService.get(this.constantService.apiPostURI.concat(rq).concat(parameters));
                };
                return OperationFactory;
            }(app.Services.GenericService.Factory));
            SpecificServices.OperationFactory = OperationFactory;
        })(SpecificServices = Services.SpecificServices || (Services.SpecificServices = {}));
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
