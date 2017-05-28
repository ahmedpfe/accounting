using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class JournalViewModel
    {
        public JournalViewModel()
        {
            EcritureComptable = new HashSet<EcritureComptableViewModel>();
        }

        public int CodeJournal { get; set; }
        public string LibelleJournal { get; set; }
        public string PrefixJournal { get; set; }
        public string PatternEcriture { get; set; }
        public bool? StatusJournal { get; set; }

        public virtual ICollection<EcritureComptableViewModel> EcritureComptable { get; set; }
    }
}
