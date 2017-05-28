using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class PieceJustificatifViewModel
    {
        public PieceJustificatifViewModel()
        {
            EcritureComptable = new HashSet<EcritureComptableViewModel>();
        }

        public long IdPieceJ { get; set; }
        public long NumeroPieceJ { get; set; }
        public string LibellePieceJ { get; set; }
        public double MontantPieceJ { get; set; }
        public DateTime DataPieceJ { get; set; }
        public long CodeTiers { get; set; }

        public virtual ICollection<EcritureComptableViewModel> EcritureComptable { get; set; }
        public virtual FactureViewModel Facture { get; set; }
        public virtual RegulementViewModel Regulement { get; set; }
        public virtual TiersViewModel CodeTiersNavigation { get; set; }
    }
}
