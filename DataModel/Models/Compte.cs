using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Compte
    {
        public Compte()
        {
            EcritureComptable = new HashSet<EcritureComptable>();
        }

        public long IdCpt { get; set; }
        public long CodeCpt { get; set; }
        public string LibelleCpt { get; set; }
        public double? MontantCpt { get; set; }
        public int? LevelCpt { get; set; }
        public string TypeCpt { get; set; }
        public long? IdCptParent { get; set; }
        public bool? VisibilityCpt { get; set; }

        public virtual ICollection<EcritureComptable> EcritureComptable { get; set; }
        public virtual Tiers Tiers { get; set; }
        public virtual Compte IdCptParentNavigation { get; set; }
        public virtual ICollection<Compte> InverseIdCptParentNavigation { get; set; }
    }
}
