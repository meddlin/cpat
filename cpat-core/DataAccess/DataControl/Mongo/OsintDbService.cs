using cpat_core.DataAccess.DataControl.Mongo.Publishers;
using cpat_core.DataAccess.DataTransferModels.Mongo;
using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using cpat_core.DataAccess.Hubs.Mongo;
using cpat_core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.WireProtocol.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static cpat_core.DataAccess.DataControl.Mongo.Publishers.TargetMongoPublisher;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class OsintDbService
    {
        private readonly IMongoCollection<OsintDto> _osintCollection;
        // private readonly IHubContext<TargetHub> _hubContext;
        // private List<TargetMongoPublisher> publisherList = new List<TargetMongoPublisher>();
        

        public OsintDbService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpatdb");
            _osintCollection = database.GetCollection<OsintDto>("osint_raw");

            // _hubContext = hubContext;
        }


        // /// <summary>
        // /// Retrieve a single <c>Target</c> from MongoDB using <c>OsintDto</c> as a mediator.
        // /// </summary>
        // /// <param name="id"></param>
        // /// <returns>A <c>Target</c> instance.</returns>
        // public Target GetSingle(Guid id)
        // {
        //     OsintDto targetData;
        //     targetData = _targets.Find<OsintDto>(t => t.Id == id).FirstOrDefault();

        //     Target target = Target.Translate(targetData);
        //     return target;
        // }

        // /// <summary>
        // /// Retrieve a lsit of <c>Target</c> one page at a time. Change the value of page and pageSize to alter the amount of
        // /// <c>Target</c> returned on each query.
        // /// </summary>
        // /// <param name="page"></param>
        // /// <param name="pageSize"></param>
        // /// <param name="minval"></param>
        // /// <returns></returns>
        // public IEnumerable<Target> GetPage(int page, int pageSize, DateTime minval)
        // {
        //     minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
        //     int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

        //     List<OsintDto> data = _targets
        //         .Find<OsintDto>(t => t.DateCreated > minval)
        //         .SortByDescending<OsintDto, OsintDto>(t => t.DateCreated)
        //         .Skip(skipVal)
        //         .Limit(pageSize)
        //         .ToList<OsintDto>();
        //     List<Target> list = Target.Translate(data).ToList();

        //     return list;
        // }

        public void Insert(OsintData osint)
        {

            OsintDto data = new OsintDto()
            {
                Id = Guid.NewGuid(),
                ToolName = osint.ToolName,
                RawData = osint.RawData,
                DateCreated = DateTime.Now
            };

            _osintCollection.InsertOne(data);
        }

        public void Insert(IEnumerable<OsintData> targets)
        {
            List<OsintDto> data = new List<OsintDto>();
            targets.ToList().ForEach(t => data.Add(new OsintDto()
            {
                Id = Guid.NewGuid(),
                ToolName = t.ToolName,
                RawData = t.RawData,
                DateCreated = DateTime.Now
            }));

            _osintCollection.InsertMany(data);
        }

        // public int Update(Guid docId, Target target)
        // {
        //     var updateDef = Builders<OsintDto>
        //         .Update
        //             .Set(t => t.Name, target.Name)
        //             .Set(t => t.Region, target.Region)
        //             .Set(t => t.CollectionType, target.CollectionType)
        //             .Set(t => t.Selected, target.Selected)
        //             .Set(t => t.DocumentRelation, target.DocumentRelation)
        //             .Set(t => t.UpdatedAt, DateTime.Now);
        //             //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

        //     UpdateResult result = _targets.UpdateOne<OsintDto>(t => t.Id == docId, updateDef);

        //     return result.IsAcknowledged ? 1 : 0;
        // }

        // public int PartialUpdate(Guid docId, Target target, IEnumerable<string> ops)
        // {
        //     // TODO : Figure out how to properly implement a partial update
        //     // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
        //     var updateDef = Builders<OsintDto>
        //         .Update
        //             .Set(t => t.Name, target.Name)
        //             .Set(t => t.Region, target.Region)
        //             .Set(t => t.CollectionType, target.CollectionType)
        //             .Set(t => t.Selected, target.Selected)
        //             .Set(t => t.DocumentRelation, target.DocumentRelation)
        //             .Set(t => t.UpdatedAt, DateTime.Now);
        //     //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

        //     UpdateResult result = _targets.UpdateOne<OsintDto>(t => t.Id == docId, updateDef);

        //     return result.IsAcknowledged ? 1 : 0;
        // }

        // /// <summary>
        // /// Deletes a <c>OsintDto</c> object.
        // /// </summary>
        // /// <param name="docId"></param>
        // /// <returns></returns>
        // public int Remove(Guid docId)
        // {
        //     DeleteResult result = _targets.DeleteOne<OsintDto>(t => t.Id == docId);
        //     return result.IsAcknowledged ? 1 : 0;
        // }
    }
}
