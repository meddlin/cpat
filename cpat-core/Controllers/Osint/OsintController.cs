using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cpat_core.Controllers.Osint
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Osint/[action]/{id?}")]
    [ApiController]
    public class OsintController : ControllerBase
    {
        public OsintController() { }

        [HttpGet]
        public string Test([FromRoute] int id)
        {
            Console.WriteLine($"osint GET test: {id}");
            return "GET test";
        }

        [HttpPost]
        public void NmapData(object postData)
        {
            Console.WriteLine($"OsintBasicController: {postData}");
        }
    }
}
