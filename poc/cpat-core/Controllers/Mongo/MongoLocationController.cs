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
    [Route("api/Mongo/Location/[action]/{id?}")]
    [ApiController]
    public class MongoLocationController : ControllerBase
    {
        private readonly ILogger<MongoLocationController> _logger;
        private readonly LocationDbService _locationDbService;

        public MongoLocationController(LocationDbService locationDbService)
        {
            _locationDbService = locationDbService;
        }

        /// <summary>
        /// Retrieve a single <c>Location</c>.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Location Get([FromRoute] string id)
        {
            return _locationDbService.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Location</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Location> Page([FromBody] PageRequest pageDoc)
        {
            return _locationDbService.GetPage(pageDoc.Page, pageDoc.PageSize, new DateTime());
        }

        /// <summary>
        /// Insert a single <c>Location</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Location data)
        {
            _locationDbService.Insert(data);
        }

        /// <summary>
        /// Update a single <c>Location</c> record.
        /// </summary>
        /// <param name="id">A <c>Guid</c> sent as <c>string</c></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromRoute] string id, [FromBody] Location data)
        {
            Guid docId = new Guid(id);
            return _locationDbService.Update(docId, data);
        }

        /// <summary>
        /// Perfrom a partial update on a <c>Location</c> record.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [HttpPatch]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Location> patch)
        {
            Guid docId = new Guid(id);

            var ops = new List<string>();
            patch.Operations.ForEach(op =>
            {
                ops.Add(op.path.TrimStart('/'));
            });

            var data = new Location();
            patch.ApplyTo(data);

            return _locationDbService.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// Delete a single <c>Location</c> record.
        /// </summary>
        /// <param name="id">A <c>string</c> representation of a <c>Guid</c>, which is the id of a <c>Location</c> document.</param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] string id)
        {
            Guid docId = new Guid(id);
            return _locationDbService.Remove(docId);
        }
    }
}
