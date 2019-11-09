using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalRTest.Models;

namespace SignalRTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TargetsController : ControllerBase
    {
        public IEnumerable<Target> Get()
        {
            return new List<Target>();
        }

        public IEnumerable<Target> Page(int pageSize, int pageNumber)
        {
            return new List<Target>();
        }

        public Target Single()
        {
            return new Target();
        }

        public string Update(TargetDto doc)
        {
            return "updated";
        }

        public string Remove(string docId)
        {
            return "removed";
        }
    }
}