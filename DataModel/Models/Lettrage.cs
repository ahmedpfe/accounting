using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Lettrage
    {
        public long IdLettrage { get; set; }
        public string LibelleLettrage { get; set; }
        public long PremiereEcritureLettre { get; set; }
        public long DeuxiemeEcritureLettre { get; set; }
        public DateTime DateLettrage { get; set; }

        public virtual EcritureComptable IdLettrageNavigation { get; set; }
        public virtual EcritureComptable PremiereEcritureLettreNavigation { get; set; }
    }
}
