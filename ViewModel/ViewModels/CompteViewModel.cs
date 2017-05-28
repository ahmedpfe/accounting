using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataModel.Models
{
    public partial class CompteViewModel
    {
        public long IdCpt { get; set; }
        public long CodeCpt { get; set; }
        public string LibelleCpt { get; set; }
        public double? MontantCpt { get; set; }
        public long? IdCptParent { get; set; }
        public bool? VisibilityCpt { get; set; }
    }
}
