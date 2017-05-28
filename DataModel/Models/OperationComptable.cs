using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class OperationComptable
    {
        public OperationComptable()
        {
            EcritureComptable = new HashSet<EcritureComptable>();
        }

        public long IdOp { get; set; }
        public string LibelleOp { get; set; }
        public string NatureOp { get; set; }
        public double MontantOp { get; set; }
        public DateTime DateOp { get; set; }
        public int IdExerciceComptable { get; set; }
        public string NumPieceJustificatifOp { get; set; }
        public int UserId { get; set; }

        public virtual ICollection<EcritureComptable> EcritureComptable { get; set; }
        public virtual ExerciceComptable IdExerciceComptableNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
