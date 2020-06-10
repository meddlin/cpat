using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpat_core.DataAccess.DataControl.Mongo;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Morcatko.AspNetCore.JsonMergePatch;

namespace cpat_core.Controllers.Mongo
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Mongo/Person/[action]/{id?}")]
    [ApiController]
    public class MongoPersonController : ControllerBase
    {
        private readonly ILogger<MongoTargetController> _logger;
        private readonly PersonDbService _personDbService;

        public MongoPersonController(PersonDbService personDbService)
        {
            _personDbService = personDbService;
        }

        /// <summary>
        /// Retrieve a single <c>Person</c>.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Person Get([FromRoute] string id)
        {
            return _personDbService.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Person</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Person> Page([FromBody] PageRequest pageDoc)
        {
            return _personDbService.GetPage(pageDoc.Page, pageDoc.PageSize, new DateTime());
        }

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Person data)
        {
            _personDbService.Insert(data);
        }

        /// <summary>
        /// Update a single <c>Person</c> record.
        /// </summary>
        /// <param name="id">A <c>Guid</c> sent as <c>string</c></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromRoute] string id, [FromBody] Person data)
        {
            Guid docId = new Guid(id);
            return _personDbService.Update(docId, data);
        }

        /// <summary>
        /// Perfrom a partial update on a <c>Person</c> record.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [HttpPatch]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Person> patch)
        {
            Guid docId = new Guid(id);

            var ops = new List<string>();
            patch.Operations.ForEach(op =>
            {
                ops.Add(op.path.TrimStart('/'));
            });

            var data = new Person();
            patch.ApplyTo(data);

            return _personDbService.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// Delete a single <c>Person</c> record.
        /// </summary>
        /// <param name="id">A <c>string</c> representation of a <c>Guid</c>, which is the id of a <c>Person</c> document.</param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] string id)
        {
            Guid docId = new Guid(id);
            return _personDbService.Remove(docId);
        }
    }
}
