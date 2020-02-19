using cpat_core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace cpat_core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TargetController
    {
        private readonly ILogger<TargetController> _logger;

        public TargetController(ILogger<TargetController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Location</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Target> Get()
        {
            return new List<Target>
            {
                new Target() { Name = "Alice" },
                new Target() { Name = "Bob" }
            };
        }
    }
}
