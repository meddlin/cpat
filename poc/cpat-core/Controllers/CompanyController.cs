using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpat_core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cpat_core.Controllers
{
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
        /// Retrieve a default collection of <c>Company</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Company> Get()
        {
            return new List<Company>()
            {
                new Company() { Name = "Alice" },
                new Company() { Name = "Bob" },
            };
        }
    }
}