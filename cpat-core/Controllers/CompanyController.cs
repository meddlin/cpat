using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpat_core.DataAccess.DataControl;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Morcatko.AspNetCore.JsonMergePatch;

namespace cpat_core.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Company/[action]/{id?}")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ILogger<CompanyController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Company</c> records.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Company Get([FromRoute] string id)
        {
            var query = new CompanyQuery();
            return query.GetSingle(new System.Guid(id));
        }

        /// <summary>
        /// Retrieve a "page" of <c>Company</c> documents.
        /// </summary>
        /// <param name="pageDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<Company> Page([FromBody] PageRequest pageDoc)
        {
            var query = new CompanyQuery();
            return query.GetPage(pageDoc.Page, pageDoc.PageSize, new System.DateTime());
        }

        /// <summary>
        /// Insert a single <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            cq.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Company</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Company> data)
        {
            var cq = new CompanyQuery();
            cq.Insert(data);
        }

        /// <summary>
        /// Update a <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            return cq.Update(data);
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

            var query = new CompanyQuery();
            return query.PartialUpdate(docId, data, ops);
        }

        /// <summary>
        /// Remove a <c>Company</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Company data)
        {
            var cq = new CompanyQuery();
            return cq.Remove(data);
        }
    }
}