using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cpat_core.Controllers
{
    [Produces("application/json")]
    [EnableCors("AppPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ILogger<CompanyController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Company</c> records.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Company> Get() // Get(Guid id)
        {
            // var cq = new CompanyQuery();
            // cq.GetSingle(id);

            return new List<Company>()
            {
                new Company() { Name = "Alice" },
                new Company() { Name = "Bob" },
            };
        }

        /// <summary>
        /// Insert a single <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            cq.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Company</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Company> data)
        {
            var cq = new CompanyQuery();
            cq.Insert(data);
        }

        /// <summary>
        /// Update a <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            return cq.Update(data);
        }

        /// <summary>
        /// Remove a <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            return cq.Remove(data);
        }
    }
}