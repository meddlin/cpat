using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocoCrdb.DataAccess
{
    public class AccountDto
    {
        public string AccountOwner { get; set; }
        public decimal Balance { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
