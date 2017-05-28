using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class FactureViewModel
    {
        public long CodePieceJ { get; set; }
        public byte[] StatusFacture { get; set; }

        public virtual PieceJustificatifViewModel CodePieceJNavigation { get; set; }
    }
}
