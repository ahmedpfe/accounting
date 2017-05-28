using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class PieceJustificatif
    {
        public PieceJustificatif()
        {
            EcritureComptable = new HashSet<EcritureComptable>();
        }

        public string IdPieceJ { get; set; }
        public long NumeroPieceJ { get; set; }
        public string LibellePieceJ { get; set; }
        public double MontantPieceJ { get; set; }
        public DateTime DataPieceJ { get; set; }
        public long CodeTiers { get; set; }

        public virtual ICollection<EcritureComptable> EcritureComptable { get; set; }
        public virtual Facture Facture { get; set; }
        public virtual Regulement Regulement { get; set; }
        public virtual Tiers CodeTiersNavigation { get; set; }
    }
}
