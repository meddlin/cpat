using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Elastic
{
    public class SearchAnalytics
    {
        public string Index { get; set; }
        public DateTime searchDate { get; set; }
    }
}
