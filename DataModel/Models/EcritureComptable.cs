using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class EcritureComptable
    {
        public EcritureComptable()
        {
            LettragePremiereEcritureLettreNavigation = new HashSet<Lettrage>();
        }

        public long NumEcriture { get; set; }
        public int NumSequenceEcriture { get; set; }
        public string LibelleEcriture { get; set; }
        public DateTime DateEcriture { get; set; }
        public double? MontantDebitEcriture { get; set; }
        public double? MontantCreditEcriture { get; set; }
        public DateTime? DateValidationEcriture { get; set; }
        public DateTime? DateEcheanceEcriture { get; set; }
        public bool? StatusEcriture { get; set; }
        public string Reference { get; set; }
        public long NumeroOperation { get; set; }
        public int CodeJ { get; set; }
        public long Compte { get; set; }

        public virtual Lettrage LettrageIdLettrageNavigation { get; set; }
        public virtual ICollection<Lettrage> LettragePremiereEcritureLettreNavigation { get; set; }
        public virtual Journal CodeJNavigation { get; set; }
        public virtual Compte CompteNavigation { get; set; }
        public virtual OperationComptable NumeroOperationNavigation { get; set; }
        public virtual PieceJustificatif ReferenceNavigation { get; set; }
    }
}
