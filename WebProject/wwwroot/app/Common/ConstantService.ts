module app.Common {

    interface IConstant {
        apiPostURI: string;
    }

    export class ConstantService implements IConstant {
        apiPostURI: string;

        constructor(private entity: string) {
            this.apiPostURI = '/api/' + entity+'/';
        }
    }

    angular.module('AccountingApp')
        .service('constantService', ConstantService);
}