using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using cpat_core.Models;
using cpat_core.DataAccess.DataControl;
using Microsoft.AspNetCore.Cors;
using cpat_core.Models.Utility;
using Morcatko.AspNetCore.JsonMergePatch;
using System;

namespace cpat_core.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Device/[action]/{id?}")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;

        public DeviceController(ILogger<DeviceController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Device</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Device Get([FromRoute] string id)
        {
            var query = new DeviceQuery();
            return query.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Device</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Device> Page([FromBody] PageRequest pageDoc)
        {
            var query = new DeviceQuery();
            return query.GetPage(pageDoc.Page, pageDoc.PageSize, new System.DateTime());
        }

        /// <summary>
        /// Insert a single <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Device data)
        {
            var q = new DeviceQuery();
            q.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Device</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Device> data)
        {
            var q = new DeviceQuery();
            q.Insert(data);
        }

        /// <summary>
        /// Update a <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Device data)
        {
            var q = new DeviceQuery();
            return q.Update(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [HttpPatch]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Device> patch)
        {
            Guid docId = new Guid(id);

            var ops = new List<string>();
            patch.Operations.ForEach(op =>
            {
                ops.Add(op.path.TrimStart('/'));
            });

            var data = new Device();
            patch.ApplyTo(data);

            var query = new DeviceQuery();
            return query.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// Remove a <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Device data)
        {
            var q = new DeviceQuery();
            return q.Remove(data);
        }
    }
}