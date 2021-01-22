using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpat_core.DataAccess.DataControl.Mongo;
using cpat_core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cpat_core.Controllers.Osint
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Osint/[action]/{id?}")]
    [ApiController]
    public class OsintController : ControllerBase
    {
        private readonly ILogger<OsintController> _logger;
        private readonly OsintDbService _osintDbService;

        public OsintController(OsintDbService osintDbService)
        {
            _osintDbService = osintDbService;
        }

        [HttpGet]
        public string Test([FromRoute] int id)
        {
            Console.WriteLine($"osint GET test: {id}");
            return "GET test";
        }

        [HttpPost]
        public void NmapData([FromBody] NmapRequest data)
        {
            Console.WriteLine($"OsintBasicController: {data.Payload}");
            
            // Send data.Payload to MongoDB :)
            var test = new OsintData() {
                ToolName = "nmap",
                RawData = data.Payload
            };
            _osintDbService.Insert(test);
        }
    }

    public class NmapRequest
    {
        public string Payload { get; set; }
    }
}
