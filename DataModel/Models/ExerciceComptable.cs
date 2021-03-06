﻿using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class ExerciceComptable
    {
        public ExerciceComptable()
        {
            OperationComptable = new HashSet<OperationComptable>();
        }

        public int IdExercice { get; set; }
        public string LibelleExercice { get; set; }
        public DateTime DateOuvertureExercice { get; set; }
        public DateTime DateFinExercice { get; set; }
        public DateTime? DateClotureExercice { get; set; }
        public string StatusExercice { get; set; }

        public virtual ICollection<OperationComptable> OperationComptable { get; set; }
    }
}
