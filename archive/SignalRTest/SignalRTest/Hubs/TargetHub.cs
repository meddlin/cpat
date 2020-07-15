using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using SignalRTest.Database;
using SignalRTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Hubs
{
    [EnableCors("CorsPolicy")]
    public class TargetHub : Hub
    {
        [HubMethodName("sendTarget")]
        public async Task SendTarget(Target targetDoc)
        {
            var dst = new DataStoreTest();
            dst.InsertTarget(targetDoc);

            var result = dst.SelectAllTargets();

            await Clients.All.SendAsync("ReceiveTargets", result);
        }
    }
}
