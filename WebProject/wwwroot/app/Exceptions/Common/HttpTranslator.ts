module app.Exceptions.Common {
    export interface IHttpTranslator {
        timer: number;
        messageProvided(code: number): string;
        SpecificmessageProvided(code: number, Entity: app.Domain.GenericModel.IEntity): string;
        successMessage(action: string): string;
        failedMessage(action: string): string;
    }

    export class HttpTranslator implements IHttpTranslator {
        public timer: number = 5000;

        messageProvided(code: number) {
            switch (code) {
                case 404:
                    return "Error up while loading data";
                case 400:
                    return "Check your data..Something wrong";
                case 401:
                    return "Delete unauthorized..this entity is linked to another one..delete the dependencies first";
                case 500:
                    return "Service unavailable";
            }
        }
        successMessage(action: string) {
            switch (action) {
                case "creation":
                    return "Created successfully";
                case "update":
                    return "Updated successfully";
                case "delete":
                    return "Deleted successfully";
            }
        }
        SpecificmessageProvided(code: number,Entity: app.Domain.GenericModel.IEntity) {
            switch (code) {
                case 404:
                    return "Error up while loading data";
                case 400:
                    return "Check your data Entry..Something wrong";
                case 401:
                    return "Delete unauthorized.." + Entity.getName() + " is linked to another one..delete the dependencies first";
                case 500:
                    return "Service unavailable";
            }
        }
        failedMessage(action: string) {
            switch (action) {
                case "creation":
                    return "Check your data Entry..Something wrong";
                case "update":
                    return "Update failed..please check your data";
                case "delete":
                    return "Something wrong up during the process..try again";
            }
        }
    }
    angular.module('AccountingApp')
        .service('httpTranslator', HttpTranslator);
}