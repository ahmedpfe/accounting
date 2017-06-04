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
            var EcritureFactory = (function (_super) {
                __extends(EcritureFactory, _super);
                function EcritureFactory(dataService, entity, $http, $q) {
                    var _this = _super.call(this, dataService, entity) || this;
                    _this.dataService = dataService;
                    _this.httpService = $http;
                    _this.qService = $q;
                    return _this;
                }
                EcritureFactory.prototype.getNumEcritureGenere = function (code) {
                    var options = "numEcriture/" + code;
                    return this.dataService.getString(this.constantService.apiPostURI + options);
                };
                return EcritureFactory;
            }(app.Services.GenericService.Factory));
            SpecificServices.EcritureFactory = EcritureFactory;
        })(SpecificServices = Services.SpecificServices || (Services.SpecificServices = {}));
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
