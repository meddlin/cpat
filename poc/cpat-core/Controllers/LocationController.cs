using cpat_core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationController
    {
        private readonly ILogger<LocationController> _logger;

        public LocationController(ILogger<LocationController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Location</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Location> Get()
        {
            return new List<Location>
            {
                new Location() { Name = "A", Latitude = "12.3123", Longitude = "1923.123" },
                new Location() { Name = "B", Latitude = "12.3123", Longitude = "1923.123" }
            };
        }
    }
}
