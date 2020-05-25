using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.Hubs
{
    [EnableCors("AppPolicy")]
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            var guid = Guid.NewGuid();

            await Clients.All.SendAsync("ReceiveMessage", user, $"{message}-{guid.ToString()}");
        }

        public async Task ReactivePage(int page, int pageSize)
        {
            var query = new TargetQuery();
            var list = query.GetPage(page, pageSize, new DateTime());

            await Clients.All.SendAsync("PagedTargets", list.ToList());
        }

        public async Task ChangefeedTest()
        {
            //var db = new Database(forLivefeed: true);
            // db.TryToParseRangefeedConnection();
            var result = "";

            Process proc = new Process();
            ProcessStartInfo psi = new ProcessStartInfo();
            // psi.WorkingDirectory = @"C:\Users\meddlin\Downloads\cockroach-v19.2.2.windows-6.2-amd64\cockroach-v19.2.2.windows-6.2-amd64";
            // psi.FileName = "CMD.exe";
            psi.FileName = @"C:\Users\meddlin\Downloads\cockroach-v19.2.2.windows-6.2-amd64\cockroach-v19.2.2.windows-6.2-amd64\cockroach.exe";
            // psi.Arguments = "sql --insecure --format=csv --execute='EXPERIMENTAL CHANGEFEED FOR cpat.target;'";
            psi.Arguments = $@" sql --insecure --format=csv --execute='EXPERIMENTAL CHANGEFEED FOR cpat.target;'";
            psi.WindowStyle = ProcessWindowStyle.Hidden;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;
            psi.RedirectStandardInput = true;
            psi.UseShellExecute = false;
            proc.StartInfo = psi;

            var outputCloseEvent = new TaskCompletionSource<bool>();
            var errorCloseEvent = new TaskCompletionSource<bool>();




            using (var process = new Process())
            {
                process.StartInfo = psi;

                process.ErrorDataReceived += new DataReceivedEventHandler((s, e) =>
                {
                    if (!String.IsNullOrEmpty(e.Data))
                        Console.WriteLine($"STDERR: {e.Data}");
                    else if (e.Data == null)
                        errorCloseEvent.SetResult(true);
                });

                process.OutputDataReceived += new DataReceivedEventHandler((s, e) =>
                {
                    if (!String.IsNullOrEmpty(e.Data))
                        Console.WriteLine($"STDOUT: {e.Data}");
                    else if (e.Data == null)
                        outputCloseEvent.SetResult(true);
                });

                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();

                process.WaitForExit();
            }

            // bool isStarted;
            //try
            //{
            //    isStarted = proc.Start();
            //} catch (Exception error)
            //{
            //    result = error.Message;
            //    isStarted = false;
            //}

            //if (isStarted)
            //{
            //    //proc.StandardInput.WriteLine($@"C:\Users\meddlin\Downloads\cockroach-v19.2.2.windows-6.2-amd64\cockroach-v19.2.2.windows-6.2-amd64\cockroach.exe sql --insecure --format=csv --execute={"'EXPERIMENTAL CHANGEFEED FOR cpat.target;'"}");
            //    //proc.StandardInput.Flush();
            //    proc.BeginOutputReadLine();
            //    proc.BeginErrorReadLine();

            //    var processTask = Task.WhenAll(outputCloseEvent.Task, errorCloseEvent.Task);
                
            //}

            //using (var reader = process.StandardOutput)
            //{
            //    Task<string> asyncRead = reader.ReadToEndAsync();
            //    var test = asyncRead.Result;
            //    Console.WriteLine(test);
            //}

            await Clients.All.SendAsync("AttemptedChangefeed", $"attempt: {Guid.NewGuid().ToString()}");
        }
    }
}
