using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class TiersViewModel
    {
        public TiersViewModel()
        {
            PieceJustificatif = new HashSet<PieceJustificatifViewModel>();
        }

        public long CodeTiers { get; set; }
        public string NomTiers { get; set; }
        public string AdresseTiers { get; set; }
        public string CourrierTiers { get; set; }
        public string FaxTiers { get; set; }
        public long PhoneTiers { get; set; }
        public long MobileTiers { get; set; }
        public string TypeTiers { get; set; }
        public long CodeCpt { get; set; }

        public virtual ICollection<PieceJustificatifViewModel> PieceJustificatif { get; set; }
        public virtual CompteViewModel CodeTiersNavigation { get; set; }
    }
}
