﻿using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class EcritureComptableViewModel
    {
        public long NumSequenceEcriture { get; set; }
        public string LibelleEcriture { get; set; }
        public DateTime DateEcriture { get; set; }
        public double? MontantDebitEcriture { get; set; }
        public double? MontantCreditEcriture { get; set; }
        public DateTime? DateValidationEcriture { get; set; }
        public DateTime? DateEcheanceEcriture { get; set; }
        public bool? StatusEcriture { get; set; }
        public string Reference { get; set; }
        public long NumeroOperation { get; set; }
        public int CodeJ { get; set; }
        public long Compte { get; set; }
        public string Journal { get; set; }
    }
}
