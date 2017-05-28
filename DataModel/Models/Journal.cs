using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Journal
    {
        public Journal()
        {
            EcritureComptable = new HashSet<EcritureComptable>();
        }

        public int CodeJournal { get; set; }
        public string LibelleJournal { get; set; }
        public string PrefixJournal { get; set; }
        public string PatternEcriture { get; set; }
        public bool? StatusJournal { get; set; }

        public virtual ICollection<EcritureComptable> EcritureComptable { get; set; }
    }
}
