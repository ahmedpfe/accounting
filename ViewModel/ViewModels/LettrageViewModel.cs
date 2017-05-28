using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class LettrageViewModel
    {
        public long IdLettrage { get; set; }
        public string LibelleLettrage { get; set; }
        public long PremiereEcritureLettre { get; set; }
        public long DeuxiemeEcritureLettre { get; set; }
        public DateTime DateLettrage { get; set; }

        public virtual EcritureComptableViewModel IdLettrageNavigation { get; set; }
        public virtual EcritureComptableViewModel PremiereEcritureLettreNavigation { get; set; }
    }
}
