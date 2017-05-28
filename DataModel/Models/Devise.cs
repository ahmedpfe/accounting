using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class Devise
    {
        public Devise()
        {
            CoursEchange = new HashSet<CoursEchange>();
        }

        public int IdDevise { get; set; }
        public string NomDevise { get; set; }
        public string PrefixDevise { get; set; }
        public string SigneDevise { get; set; }
        public int UniteDevise { get; set; }
        public int CodeInternationalDevise { get; set; }
        public int NombreDecimalDevise { get; set; }

        public virtual ICollection<CoursEchange> CoursEchange { get; set; }
    }
}
