module app.Services.SpecificServices {
    interface IEcritureFactory {
        getNumEcritureGenere(code);
    }
    export class EcritureFactory extends app.Services.GenericService.Factory implements IEcritureFactory {
        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        constructor(public dataService: app.Common.DataService, entity: string, $http: ng.IHttpService, $q: ng.IQService) {
            super(dataService, entity);
            this.httpService = $http;
            this.qService = $q;
        }
        public getNumEcritureGenere(code): ng.IPromise<string> {
            var options = "numEcriture/" + code;
            return this.dataService.getString(this.constantService + options);
        }
    }
}