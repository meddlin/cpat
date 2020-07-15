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
    [Route("api/Mongo/Device/[action]/{id?}")]
    [ApiController]
    public class MongoDeviceController : ControllerBase
    {
        private readonly ILogger<MongoDeviceController> _logger;
        private readonly DeviceDbService _deviceDbService;

        public MongoDeviceController(DeviceDbService deviceDbService)
        {
            _deviceDbService = deviceDbService;
        }

        /// <summary>
        /// Retrieve a single <c>Device</c>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Device Get([FromRoute] string id)
        {
            return _deviceDbService.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Device</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Device> Page([FromBody] PageRequest pageDoc)
        {
            return _deviceDbService.GetPage(pageDoc.Page, pageDoc.PageSize, new DateTime());
        }

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Device data)
        {
            _deviceDbService.Insert(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">A <c>Guid</c> sent as <c>string</c></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromRoute] string id, [FromBody] Device data)
        {
            Guid docId = new Guid(id);
            return _deviceDbService.Update(docId, data);
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

            return _deviceDbService.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] string id)
        {
            Guid docId = new Guid(id);
            return _deviceDbService.Remove(docId);
        }
    }
}
