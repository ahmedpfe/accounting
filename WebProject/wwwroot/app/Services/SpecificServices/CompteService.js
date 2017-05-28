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
            var CompteFactory = (function (_super) {
                __extends(CompteFactory, _super);
                function CompteFactory(dataService, entity, $http, $q) {
                    var _this = _super.call(this, dataService, entity) || this;
                    _this.dataService = dataService;
                    _this.httpService = $http;
                    _this.qService = $q;
                    _this.ws = "GetPattern";
                    _this.lastLevel = 'GetAccountsofLastLevel';
                    _this.definedAccouts = 'WrittingAccounts';
                    return _this;
                }
                CompteFactory.prototype.displayAccounts = function () {
                    return this.dataService.get(this.constantService.apiPostURI.concat(this.lastLevel));
                };
                CompteFactory.prototype.displayAllDefinedAccounts = function () {
                    return this.dataService.get(this.constantService.apiPostURI);
                };
                CompteFactory.prototype.createNewUserAccount = function (account) {
                    return this.dataService.add(this.constantService.apiPostURI.concat("createAccount"), account);
                };
                CompteFactory.prototype.displayWrittingAccounts = function () {
                    return this.dataService.get(this.constantService.apiPostURI.concat(this.definedAccouts));
                };
                CompteFactory.prototype.displaySpecificPatternAccounts = function (pattern) {
                    var data = {
                        model: pattern
                    };
                    var config = {
                        params: data,
                        headers: { 'Accept': 'application/json' }
                    };
                    return this.dataService.getWithOptions(this.constantService.apiPostURI.concat(this.ws), config);
                };
                CompteFactory.prototype.displayUserAccounts = function (id) {
                    var userAc = "GetUserAccounts/";
                    return this.dataService.get(this.constantService.apiPostURI.concat(userAc) + id);
                };
                return CompteFactory;
            }(app.Services.GenericService.Factory));
            SpecificServices.CompteFactory = CompteFactory;
            angular.module('app.services', []).service('CompteFactory', CompteFactory);
        })(SpecificServices = Services.SpecificServices || (Services.SpecificServices = {}));
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
