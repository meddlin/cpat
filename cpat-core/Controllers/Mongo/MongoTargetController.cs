using cpat_core.DataAccess.DataControl.Mongo;
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

namespace cpat_core.Controllers.Mongo
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Mongo/Target/[action]/{id?}")]
    [ApiController]
    public class MongoTargetController : ControllerBase
    {
        private readonly ILogger<MongoTargetController> _logger;
        private readonly TargetDbService _targetDbService;

        public MongoTargetController(TargetDbService targetDbService)
        {
            _targetDbService = targetDbService;
        }

        /// <summary>
        /// Retrieve a single <c>Target</c>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Target Get([FromRoute] string id)
        {
            return _targetDbService.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Target</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Target> Page([FromBody] PageRequest pageDoc)
        {
            return _targetDbService.GetPage(pageDoc.Page, pageDoc.PageSize, new DateTime());
        }

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Target data)
        {
            _targetDbService.Insert(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">A <c>Guid</c> sent as <c>string</c></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromRoute] string id, [FromBody] Target data)
        {
            Guid docId = new Guid(id);
            return _targetDbService.Update(docId, data);
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

            var data = new Target();
            patch.ApplyTo(data);

            return _targetDbService.PartialUpdate(docId, data, ops);
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
            return _targetDbService.Remove(docId);
        }

        /// <summary>
        /// Set a <c>Target</c> as the chosen <c>Target</c> for scans.
        /// </summary>
        /// <param name="target"></param>
        /// <returns></returns>
        [HttpPost]
        public bool Set([FromBody] string id)
        {
            Guid docId = new Guid(id);
            _targetDbService.SetTarget(docId);
            return true;
        }
    }
}
