using cpat_core.DataAccess.DataControl.Mongo;
using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using MongoDB.Driver;
using NPoco.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.Hubs.Mongo
{
    [EnableCors("AppPolicy")]
    public class TargetHub : Hub
    {
        private readonly TargetDbService _targetDbService;

        public TargetHub(TargetDbService targetDbService)
        {
            _targetDbService = targetDbService;
        }

        public async Task SubscribeById(string docId)
        {
            // Much of the streaming options, query is taken from here.
            // https://stackoverflow.com/questions/48672584/how-to-set-mongodb-change-stream-operationtype-in-the-c-sharp-driver

            // Set options.
            // Get the whole document instead of just the changed portion
            var options = new ChangeStreamOptions() { FullDocument = ChangeStreamFullDocumentOption.UpdateLookup };

            // Set our matching criteria
            // Example: The operationType can be one of the following: insert, update, replace, delete, invalidate
            // Example: var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<BsonDocument>>().Match("{ operationType: { $in: [ 'replace', 'insert', 'update' ] } }");
            var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<TargetDto>>()
                    .Match(t => t.FullDocument.Id == Guid.Parse(""));

            Guid subscriptionId = _targetDbService.Subscribe(pipeline, options);
        }
    }
}
