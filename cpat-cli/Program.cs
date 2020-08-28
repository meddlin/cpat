using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace cpat_cli
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();

        // static void Main(string[] args)
        static async Task Main(string[] args)
        {
            Console.WriteLine("Welcome to CPAT (Collaborative Penetration-testing and Analysis Toolkit)");

            await SendApiGet("/targets");

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
