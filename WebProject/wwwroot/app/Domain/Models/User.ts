module app.Domain.Models {
    export interface IUser {
        idUser: number;
        usernameUser: string;
        nomUser: string;
        prenomUser: string;
        adresseUser: string;
    }

    export class User extends app.Domain.GenericModel.EntityBase implements IUser {
        constructor(public idUser: number, public usernameUser: string, public nomUser: string, public prenomUser: string, public adresseUser: string) {

            super();
            this.idUser = idUser;
            this.usernameUser = usernameUser;
            this.nomUser = nomUser;
            this.prenomUser = prenomUser;
            this.adresseUser = adresseUser;
        }
    }
}