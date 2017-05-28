module app.Common {

    interface IDataService {
        get(resource: string): ng.IPromise<app.Domain.GenericModel.EntityBase[]>;
        exception: app.Exceptions.Model.IException;
    }

    export class DataService implements IDataService {
        exception: app.Exceptions.Model.IException;
        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        static $inject = ['$http', '$q'];
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.httpService = $http;
            this.qService = $q;
        }

        get(resource: string): ng.IPromise<app.Domain.GenericModel.EntityBase[]> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (errors) {
                self.exception = new app.Exceptions.Model.Exception(errors.status, errors.statusText);
                deferred.reject(self.exception);
            });

            return deferred.promise;
        }
        getWithOptions(resource: string, Options : any): ng.IPromise<app.Domain.GenericModel.EntityBase[]> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource, Options).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (errors) {
                var error = {
                    code: errors.status,
                    msg: errors.statusText
                };
                deferred.reject(error);
            });
            return deferred.promise;
        }
        getSingle(resource: string): ng.IPromise<app.Domain.GenericModel.EntityBase> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (errors) {
                var error = {
                    code: errors.status,
                    msg: errors.statusText
                };
                deferred.reject(error);
            });

            return deferred.promise;
        }

        add(resource: string, entity: app.Domain.GenericModel.IEntity): ng.IPromise<app.Domain.GenericModel.EntityBase> {
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
        }

        update(resource: string, entity: app.Domain.GenericModel.IEntity): ng.IPromise<app.Domain.GenericModel.EntityBase> {
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
        }

        remove(resource: string): ng.IPromise<any> {
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
        }
        getNumber(resource: string): ng.IPromise<number> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (errors) {
                var error = {
                    code: errors.status,
                    msg: errors.statusText
                };
                deferred.reject(error);
            });

            return deferred.promise;
        }
        getString(resource: string): ng.IPromise<string> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.get(resource).then(function (result: any) {
                deferred.resolve(result.data);
            }, function (errors) {
                var error = {
                    code: errors.status,
                    msg: errors.statusText
                };
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }

    angular.module('AccountingApp')
        .service('dataService', DataService);
} 