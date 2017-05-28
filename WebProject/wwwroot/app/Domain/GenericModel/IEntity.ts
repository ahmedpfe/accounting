module app.Domain.GenericModel {
    export interface IEntity {
        getName(): string;
    }

    export class EntityBase implements IEntity {
        constructor() { }
        getName() {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((<any>this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        }
    }
} 