var app;
(function (app) {
    var Services;
    (function (Services) {
        var GenericService;
        (function (GenericService) {
            var Factory = (function () {
                function Factory(dataService, entity) {
                    this.dataService = dataService;
                    this.entity = entity;
                    this.constantService = new app.Common.ConstantService(entity);
                }
                Factory.prototype.displaydata = function () {
                    return this.dataService.get(this.constantService.apiPostURI);
                };
                Factory.prototype.createNewData = function (model) {
                    return this.dataService.add(this.constantService.apiPostURI, model);
                };
                ;
                Factory.prototype.updateData = function (model) {
                    return this.dataService.update(this.constantService.apiPostURI, model);
                };
                ;
                Factory.prototype.deleteData = function (id) {
                    return this.dataService.remove(this.constantService.apiPostURI + id);
                };
                ;
                Factory.prototype.GetSpecificData = function (id) {
                    return this.dataService.getSingle(this.constantService.apiPostURI + id);
                };
                ;
                return Factory;
            }());
            GenericService.Factory = Factory;
            angular.module('app.services', []).service('genericService', Factory);
        })(GenericService = Services.GenericService || (Services.GenericService = {}));
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
