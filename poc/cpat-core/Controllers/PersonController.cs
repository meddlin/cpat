using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Morcatko.AspNetCore.JsonMergePatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Person/[action]/{id?}")]
    [ApiController]
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
        public Person Get([FromRoute] string id)
        {
            var query = new PersonQuery();
            return query.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Person</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Person> Page([FromBody] PageRequest pageDoc)
        {
            var query = new PersonQuery();
            return query.GetPage(pageDoc.Page, pageDoc.PageSize, new System.DateTime());
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
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [HttpPatch]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Target> patch)
        {
            Guid docId = new Guid(id);

            var ops = new List<string>();
            patch.Operations.ForEach(op =>
            {
                ops.Add(op.path.TrimStart('/'));
            });

            var data = new Person();
            patch.ApplyTo(data);

            var query = new PersonQuery();
            //return query.Update(docId, data);
            return query.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// Remove a <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromRoute] string id)
        {
            var query = new PersonQuery();
            //return query.Remove(data);

            return 0;
        }
    }
}
