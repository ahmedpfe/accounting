using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class OperationComptableViewModel
    {
        public OperationComptableViewModel()
        {
            EcritureComptable = new HashSet<EcritureComptableViewModel>();
        }
        public long IdOp { get; set; }
        public string LibelleOp { get; set; }
        public double MontantOp { get; set; }
        public DateTime DateOp { get; set; }
        public int UserId { get; set; }
        public int IdExerciceComptable { get; set; }
        public string NumPieceJustificatifOp { get; set; }

        public virtual ICollection<EcritureComptableViewModel> EcritureComptable { get; set; }
    }
}
