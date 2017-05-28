using System;
using System.Collections.Generic;

namespace DataModel.Models
{
    public partial class User
    {
        public User()
        {
            OperationComptable = new HashSet<OperationComptable>();
        }

        public int IdUser { get; set; }
        public string UsernameUser { get; set; }
        public string NomUser { get; set; }
        public string PrenomUser { get; set; }
        public string AdresseUser { get; set; }

        public virtual ICollection<OperationComptable> OperationComptable { get; set; }
    }
}
