using cpat_core.DataAccess.DataControl.Mongo;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        public MongoTargetController(TargetDbService targetDbServer)
        {
            _targetDbService = targetDbServer;
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
    }
}
