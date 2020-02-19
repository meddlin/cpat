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
    public class PersonController
    {
        private readonly ILogger<PersonController> _logger;

        public PersonController(ILogger<PersonController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Location</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return new List<Person>
            {
                new Person() { FirstName = "Alice" },
                new Person() { FirstName = "Bob" }
            };
        }
    }
}
