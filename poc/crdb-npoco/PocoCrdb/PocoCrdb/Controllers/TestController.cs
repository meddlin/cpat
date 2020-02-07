using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PocoCrdb.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Test/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public bool Get()
        {
            return true;
        }
    }
}