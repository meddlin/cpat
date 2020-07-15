using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using SignalRTest.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Hubs
{
    [EnableCors("CorsPolicy")]
    public class ChatHub : Hub
    {
        public ChatHub()
        {

        }

        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine($"{user} - {message}");

            var dst = new DataStoreTest();
            dst.SimpleInsertTest(42);

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
