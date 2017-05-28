var app;
(function (app) {
    var Common;
    (function (Common) {
        var DataService = (function () {
            function DataService($http, $q) {
                this.httpService = $http;
                this.qService = $q;
            }
            DataService.prototype.get = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    self.exception = new app.Exceptions.Model.Exception(errors.status, errors.statusText);
                    deferred.reject(self.exception);
                });
                return deferred.promise;
            };
            DataService.prototype.getWithOptions = function (resource, Options) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource, Options).then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.getSingle = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.add = function (resource, entity) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.post(resource, entity)
                    .then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.update = function (resource, entity) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.put(resource, entity)
                    .then(function (data) {
                    deferred.resolve(data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.remove = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.delete(resource)
                    .then(function (data) {
                    deferred.resolve(data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.getNumber = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            DataService.prototype.getString = function (resource) {
                var self = this;
                var deferred = self.qService.defer();
                self.httpService.get(resource).then(function (result) {
                    deferred.resolve(result.data);
                }, function (errors) {
                    var error = {
                        code: errors.status,
                        msg: errors.statusText
                    };
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            return DataService;
        }());
        DataService.$inject = ['$http', '$q'];
        Common.DataService = DataService;
        angular.module('AccountingApp')
            .service('dataService', DataService);
    })(Common = app.Common || (app.Common = {}));
})(app || (app = {}));
