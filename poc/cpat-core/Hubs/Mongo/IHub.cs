using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Hubs.Mongo
{
    interface IHub
    {
        public Task SubscribeById(string docId);
    }
}
