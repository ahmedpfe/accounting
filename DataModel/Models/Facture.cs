using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Facture
    {
        public string CodePieceJ { get; set; }
        public bool? StatusFacture { get; set; }

        public virtual PieceJustificatif CodePieceJNavigation { get; set; }
    }
}
