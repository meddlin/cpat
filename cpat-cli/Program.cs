using System;
using System.CommandLine;
using System.CommandLine.DragonFruit;
using System.CommandLine.Invocation;
using System.CommandLine.Rendering;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Threading.Tasks;

namespace cpat_cli
{
    public class ExampleProfile
    {
        public string User { get; set; }
        public string ApiKey { get; set; }
    }

    class Program
    {
        private static readonly HttpClient client = new HttpClient();


        // static void Main(string[] args)
        // static async Task Main(string[] args)

        /// <summary>
        /// Testing the DragonFruit CLI parsing abilities
        /// </summary>
        /// <param name="context">Represents the ConsoleRenderer context. Not entered by user.</param>
        /// <param name="verbose"></param>
        /// <param name="numbers"></param>
        /// <param name="get">Submit a REST endpoint to GET from the cpat-core API.</param>
        static async Task Main(InvocationContext context, bool verbose, int[] numbers, string create, ExampleProfile profile)
        {
            var consoleRenderer = new ConsoleRenderer(
                context.Console,
                context.BindingContext.OutputMode(),
                true);

            var profileComm = new RootCommand("setProfile")
            {
                new Command("user")
            };
            profileComm.Handler = CommandHandler.Create(() =>
            {
                Console.WriteLine("inside the profile command handler");
            });

            if (verbose) Console.WriteLine("verbose flag -> ON");

            Console.WriteLine("CPAT - Hello!");

            // profileComm.InvokeAsync(args).Wait();
        }

        public static async Task SendApiGet(string route)
        {

            // make API call
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var stringTask = client.GetStringAsync("https://localhost:5001" + "/api/osint/test");

            var msg = await stringTask;
            Console.Write(msg);

        }
    }

    
}
