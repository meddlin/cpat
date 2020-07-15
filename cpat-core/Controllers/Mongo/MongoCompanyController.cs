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
    [Route("api/Mongo/Company/[action]/{id?}")]
    [ApiController]
    public class MongoCompanyController : ControllerBase
    {
        private readonly ILogger<MongoCompanyController> _logger;
        private readonly CompanyDbService _companyDbService;

        public MongoCompanyController(CompanyDbService companyDbService)
        {
            _companyDbService = companyDbService;
        }

        /// <summary>
        /// Retrieve a single <c>Company</c>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public Company Get([FromRoute] string id)
        {
            return _companyDbService.GetSingle(new Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Company</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Company> Page([FromBody] PageRequest pageDoc)
        {
            return _companyDbService.GetPage(pageDoc.Page, pageDoc.PageSize, new DateTime());
        }

        /// <summary>
        /// Insert a single <c>Person</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Company data)
        {
            _companyDbService.Insert(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">A <c>Guid</c> sent as <c>string</c></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromRoute] string id, [FromBody] Company data)
        {
            Guid docId = new Guid(id);
            return _companyDbService.Update(docId, data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [HttpPatch]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public int PartialUpdate([FromRoute] string id, [FromBody] JsonMergePatchDocument<Company> patch)
        {
            Guid docId = new Guid(id);

            var ops = new List<string>();
            patch.Operations.ForEach(op =>
            {
                ops.Add(op.path.TrimStart('/'));
            });

            var data = new Company();
            patch.ApplyTo(data);

            return _companyDbService.PartialUpdate(docId, data, ops);
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
            return _companyDbService.Remove(docId);
        }
    }
}
