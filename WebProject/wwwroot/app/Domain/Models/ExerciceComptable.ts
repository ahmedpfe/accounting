module app.Domain.Models {
    export interface IExerciceComptable {
        idExercice: number;
        libelleExercice: string;
        dateOuvertureExercice: Date;
        dateClotureExercice?: Date;
        dateFinExercice: Date;
        statusExercice: string;
    }

    export class ExerciceComptable extends app.Domain.GenericModel.EntityBase implements IExerciceComptable {
        constructor(public idExercice: number, public libelleExercice: string, public dateOuvertureExercice: Date, public dateFinExercice: Date, public statusExercice: string, public dateClotureExercice?: Date) {

            super();
            this.idExercice = idExercice;
            this.libelleExercice = libelleExercice;
            this.dateOuvertureExercice = dateOuvertureExercice;
            this.dateFinExercice = dateFinExercice;
            this.statusExercice = statusExercice;
            this.dateClotureExercice = dateClotureExercice;
            
        }
    }
}