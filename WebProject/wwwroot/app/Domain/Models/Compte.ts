module app.Domain.Models {
    export interface ICompte {
        idCpt: number;
        codeCpt: number;
        libelleCpt: string;
        idCptParent: number;
        visibilityCpt: boolean;
        montantCpt?: number;
    }

    export class Compte extends app.Domain.GenericModel.EntityBase implements ICompte {
        constructor(public idCpt: number, public codeCpt: number, public libelleCpt: string, public idCptParent: number, public visibilityCpt: boolean, public montantCpt?: number) {

            super();
            this.idCpt = idCpt;
            this.codeCpt = codeCpt;
            this.libelleCpt = libelleCpt;
            this.idCptParent = idCptParent;
            this.visibilityCpt = visibilityCpt;
            this.montantCpt = montantCpt;
        }
    }
}