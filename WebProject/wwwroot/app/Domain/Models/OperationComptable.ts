module app.Domain.Models {
    export interface IOperation {
        idOp: number;
        libelleOp: string;       
        montantOp: number;
        dateOp: Date;
        idExerciceComptable: number;
        numPieceJustificatifOp: string;
        userId: number;
    }
    export class Operation extends app.Domain.GenericModel.EntityBase implements IOperation {
        idOp: number;
        constructor(public libelleOp: string, public montantOp: number, public dateOp: Date, public idExerciceComptable: number, public numPieceJustificatifOp: string, public userId: number) {

            super();
            this.libelleOp = libelleOp;
            this.montantOp = montantOp;
            this.dateOp = dateOp;
            this.idExerciceComptable = idExerciceComptable;
            this.numPieceJustificatifOp = numPieceJustificatifOp;
            this.userId = userId;
        }
    }
}