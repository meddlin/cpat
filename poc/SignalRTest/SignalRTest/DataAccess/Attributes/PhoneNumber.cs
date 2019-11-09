using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.DataAccess.Models.Attributes
{
    public class PhoneNumber
    {
        public string CountryCode { get; set; }
        public string AreaCode { get; set; }
        public string Primary { get; set; }
        public string Secondary { get; set; }
    }
}
