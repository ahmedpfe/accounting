using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class CoursEchange
    {
        public long IdCours { get; set; }
        public int IdDevise { get; set; }
        public DateTime DateCours { get; set; }
        public double ValeurCours { get; set; }

        public virtual Devise IdDeviseNavigation { get; set; }
    }
}
