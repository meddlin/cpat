using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cpat_core.Controllers.Search
{
    /// <summary>
    /// Controller for passing along "analytics query" requests to the ElasticSearch bake-end service.
    /// </summary>
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Analytics/[action]/{id?}")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
    }
}
