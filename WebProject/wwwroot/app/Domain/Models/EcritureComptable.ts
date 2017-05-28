module app.Domain.Models {
    export interface IEcriture {
        numSequenceEcriture: number;
        libelleEcriture: string;
        dateEcriture: Date;
        montantDebitEcriture?: number;
        montantCreditEcriture?: number;
        dateValidationEcriture?: Date;
        dateEcheanceEcriture?: Date;
        reference: string;
        numeroOperation: number;
        codeJ: number;
        compte: number;
    }
    export class Ecriture extends app.Domain.GenericModel.EntityBase implements IEcriture {
        idOp: number;
        constructor(public numSequenceEcriture: number, public libelleEcriture: string, public dateEcriture: Date, public reference: string, public numeroOperation: number, public codeJ: number, public compte: number, public montantDebitEcriture?: number, public montantCreditEcriture?: number, public dateValidationEcriture?: Date, public dateEcheanceEcriture?: Date) {

            super();
            this.numSequenceEcriture = numSequenceEcriture;
            this.libelleEcriture = libelleEcriture;
            this.dateEcriture = dateEcriture;
            this.reference = reference;
            this.numeroOperation = numeroOperation;
            this.codeJ = codeJ;
            this.compte = compte;
            this.montantDebitEcriture = montantDebitEcriture;
            this.montantCreditEcriture = montantCreditEcriture;
            this.dateEcheanceEcriture = dateEcheanceEcriture;
            this.dateValidationEcriture = dateValidationEcriture;
        }
    }
}
