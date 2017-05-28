using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class RegulementViewModel
    {
        public long CodePieceJ { get; set; }
        public string ModeRegulement { get; set; }

        public virtual PieceJustificatifViewModel CodePieceJNavigation { get; set; }
    }
}
