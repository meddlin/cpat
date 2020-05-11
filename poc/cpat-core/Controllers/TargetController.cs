using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using cpat_core.Models.TargetTypes;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Morcatko.AspNetCore.JsonMergePatch;
using System;
using System.Collections.Generic;

namespace cpat_core.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Target/[action]/{id?}")]
    [ApiController]
    public class TargetController : ControllerBase
    {
        private readonly ILogger<TargetController> _logger;

        public TargetController(ILogger<TargetController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a single <c>Target</c>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Target Get([FromRoute] string id)
        {
            var query = new TargetQuery();

            return query.GetSingle(new System.Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Target</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Target> Page([FromBody] PageRequest pageDoc)
        {
            var query = new TargetQuery();
            return query.GetPage(pageDoc.Page, pageDoc.PageSize, new System.DateTime());
        }

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Target data)
        {
            var query = new TargetQuery();
            query.Insert(data);
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

            var query = new TargetQuery();
            return query.Update(docId, data);
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

            var query = new TargetQuery();
            return query.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Target data)
        {
            var query = new TargetQuery();
            return query.Remove(data);
        }

        /// <summary>
        /// Set a <c>Target</c> as the chosen <c>Target</c> for scans.
        /// </summary>
        /// <param name="target"></param>
        /// <returns></returns>
        [HttpPost]
        public bool Set([FromBody] string target)
        {

            return true;
        }
    }
}
