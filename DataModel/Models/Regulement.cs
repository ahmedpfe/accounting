using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Regulement
    {
        public string CodePieceJ { get; set; }
        public string ModeRegulement { get; set; }

        public virtual PieceJustificatif CodePieceJNavigation { get; set; }
    }
}
