using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Controllers
{
    [Produces("application/json")]
    [EnableCors("AppPolicy")]
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

        /// <summary>
        /// Insert a single <c>Location</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Location data)
        {
            var query = new LocationQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Location</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Location> data)
        {
            var query = new LocationQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Update a <c>Location</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Location data)
        {
            var query = new LocationQuery();
            return query.Update(data);
        }

        /// <summary>
        /// Remove a <c>Location</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Location data)
        {
            var query = new LocationQuery();
            return query.Remove(data);
        }
    }
}
