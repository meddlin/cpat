using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Morcatko.AspNetCore.JsonMergePatch;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Location/[action]/{id?}")]
    [ApiController]
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
        public Location Get([FromRoute] string id)
        {
            var query = new LocationQuery();
            return query.GetSingle(new System.Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Location</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Location> Page([FromBody] PageRequest pageDoc)
        {
            var query = new LocationQuery();
            return query.GetPage(pageDoc.Page, pageDoc.PageSize, new System.DateTime());
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
        /// Perform a sparse/partial update on a <c>Location</c> document
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

            var query = new LocationQuery();
            //return query.Update(docId, data);
            return query.PartialUpdate(docId, data, ops);
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
