using cpat_core.DataAccess.DataControl;
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
        /// Retrieve a default collection of <c>Person</c>
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

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Person data)
        {
            var query = new PersonQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Person</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Person> data)
        {
            var query = new PersonQuery();
            query.Insert(data);
        }

        /// <summary>
        /// Update a <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Person data)
        {
            var query = new PersonQuery();
            return query.Update(data);
        }

        /// <summary>
        /// Remove a <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Person data)
        {
            var query = new PersonQuery();
            return query.Remove(data);
        }
    }
}
