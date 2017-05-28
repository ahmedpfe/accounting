module app.Domain.Models {
    export interface IJournal {
        codeJournal: number;
        libelleJournal: string;
        prefixJournal: string;
        patternEcriture: string;
    }

    export class Journal extends app.Domain.GenericModel.EntityBase implements IJournal {
        constructor(public codeJournal: number, public libelleJournal: string, public prefixJournal: string, public patternEcriture: string) {

            super();
            this.codeJournal = codeJournal;
            this.libelleJournal = libelleJournal;
            this.prefixJournal = prefixJournal;
            this.patternEcriture = patternEcriture;
        }
        
    }
}