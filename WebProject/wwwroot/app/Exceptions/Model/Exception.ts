module app.Exceptions.Model {
    export interface IException {

        code: number;
        status: string;
    }

    export class Exception implements IException {
        code: number;
        status: string;
        constructor(code: number, status: string) {           
            this.code = code;
            this.status = status;
        }
    }
}