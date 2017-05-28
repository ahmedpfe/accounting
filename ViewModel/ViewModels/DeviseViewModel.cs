using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class DeviseViewModel
    {
        public DeviseViewModel()
        {
            CoursEchange = new HashSet<CoursEchangeViewModel>();
        }

        public int IdDevise { get; set; }
        public string NomDevise { get; set; }
        public string PrefixDevise { get; set; }
        public string SigneDevise { get; set; }
        public int UniteDevise { get; set; }
        public int CodeInternationalDevise { get; set; }
        public int NombreDecimalDevise { get; set; }

        public virtual ICollection<CoursEchangeViewModel> CoursEchange { get; set; }
    }
}
