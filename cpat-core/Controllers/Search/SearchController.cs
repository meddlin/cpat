using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Configuration;
using cpat_core.DataAccess.DataTransferModels;
using Nest;
using cpat_core.DataAccess.DataTransferModels.Elastic;

namespace cpat_core.Controllers.Search
{
    /// <summary>
    /// Controller for passing along "search query" requests to the ElasticSearch back-end service.
    /// </summary>
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Search/[action]/{id?}")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public SearchController()
        {

        }

        /// <summary>
        /// List the indices
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string ListIndices()
        {
            var node = new Uri("http://192.168.1.44:9200");
            var settings = new Nest.ConnectionSettings(node).DefaultIndex("my-replica-set.cpatdb.targets");

            var client = new ElasticClient(settings);
            var searchResponse = client.Search<DataAccess.DataTransferModels.Elastic.TargetDto>(s => s
                .Query(q => q.MatchAll())
            );

            // just using this as a test for now

            // Call to Elastic, get a list of the indices.

            return "this is a test";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IEnumerable<DataAccess.DataTransferModels.Elastic.TargetDto> Query()
        {
            var node = new Uri("http://192.168.1.44:9200");
            var settings = new Nest.ConnectionSettings(node).DefaultIndex("my-replica-set.cpatdb.targets");

            var client = new ElasticClient(settings);
            //var searchResponse = client.Search<DataAccess.DataTransferModels.Elastic.TargetDto>(s => s
            //    .Query(q => q
            //        .Bool(b => b
            //            .Must(m => m
            //                .Match(match => match
            //                    .Field(f => f.Name == query)
            //                )
            //            )
            //        )
            //    )
            //);
            var searchResponse = client.Search<DataAccess.DataTransferModels.Elastic.TargetDto>(s => s
                .Query(q => q.MatchAll())
            );

            var analyticsEntry = new SearchAnalytics() { Index = "targets", searchDate = DateTime.Now };
            var analyticsResponse = client.Index<SearchAnalytics>(analyticsEntry, i => i.Index("analytics"));

            return searchResponse.Documents.ToList();
        }
    }
}
