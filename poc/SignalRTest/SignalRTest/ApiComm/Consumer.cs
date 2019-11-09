using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Net.Http.Formatting;

namespace SignalRTest.ApiComm
{
    public class Consumer
    {
        private readonly string _uri = "http://localhost:5000";

        public void ContactOsintApi()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(_uri);

            // Add an accept header for JSON format
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync("/").Result; // Blocking call
            // ...the program will wait here until a response is received or a timeout occurs.

            if (response.IsSuccessStatusCode)
            {
                // Using ReadAsStringAsync to specify a MediaFormatter, the default ones don't pertain to "text/html" or "text/plain"
                // https://stackoverflow.com/questions/12512483/no-mediatypeformatter-is-available-to-read-an-object-of-type-string-from-conte
                if (response.Content.Headers.ContentType.MediaType == "text/html")
                {
                    var result = response.Content.ReadAsStringAsync().Result;
                    Console.WriteLine($"From text/html response: {result.ToString()}");
                } else
                {
                    // Parse the response body
                    var result = response.Content.ReadAsAsync<IEnumerable<object>>().Result;
                    foreach (var d in result)
                    {
                        Console.WriteLine("{0}", d.ToString());
                    }
                }
                
            } else
            {
                Console.WriteLine($"{(int)response.StatusCode} ({response.ReasonPhrase})");
            }

            // make other calls using HttpClient here

            // Dispose once all HttpClient calls are complete.
            client.Dispose();
        }
    }
}
