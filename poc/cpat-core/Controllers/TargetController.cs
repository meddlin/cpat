using cpat_core.DataAccess.DataControl;
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

        /// <summary>
        /// Insert a single <c>Target</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Target data)
        {
            var query = new TargetQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Target</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Target> data)
        {
            var query = new TargetQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Update a <c>Target</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Target data)
        {
            var query = new TargetQuery();
            return query.Update(data);
        }

        /// <summary>
        /// Remove a <c>Target</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Target data)
        {
            var query = new TargetQuery();
            return query.Remove(data);
        }
    }
}
