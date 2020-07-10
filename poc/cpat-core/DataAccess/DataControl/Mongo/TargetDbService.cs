using cpat_core.DataAccess.DataControl.Mongo.Publishers;
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
    public class TargetDbService
    {
        private readonly IMongoCollection<TargetDto> _targets;
        private readonly IHubContext<TargetHub> _hubContext;
        private List<TargetMongoPublisher> publisherList = new List<TargetMongoPublisher>();
        

        public TargetDbService(IConfiguration config, IHubContext<TargetHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpatdb");
            _targets = database.GetCollection<TargetDto>("targets");

            _hubContext = hubContext;
        }

        internal void EmitMessage(object sender, TargetMessageEventArgs e)
        {
            Console.WriteLine($"back in TargetDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
        }

        /// <summary>
        /// Send data to connected clients via SignalR.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task SendMessage(TargetDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-TargetById", data);
        }

        /// <summary>
        /// Setup a <c>MongoPublisher</c>, start a <c>Task</c> for change data capture, and setup a listener
        /// to push results back to clients.
        /// </summary>
        /// <param name="pipeline"></param>
        /// <param name="options"></param>
        public Guid Subscribe(PipelineDefinition<ChangeStreamDocument<TargetDto>, ChangeStreamDocument<TargetDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new TargetMongoPublisher(_targets, pipeline, options);
            mp.MessageEmitted += EmitMessage;

            // Register MongoPublisher in collection
            var regId = mp.Register();
            publisherList.Add(mp);

            // Start publisher
            mp.Kickoff();

            return regId;
        }

        /// <summary>
        /// Stop 
        /// </summary>
        /// <param name="publisherId"></param>
        public void Unsubscribe(string publisherId) // pass in 'id' associated with a MongoPublisher
        {
            // get associated MongoPublisher from publisherList
            var mp = publisherList.Where(m => m.RegistrationId == Guid.Parse(publisherId)).FirstOrDefault();

            // issue a "stop stream" on the obtained MongoPublisher
            mp.StopChangeStream();

            publisherList.Remove(mp);
        }

        /// <summary>
        /// Retrieve a single <c>Target</c> from MongoDB using <c>TargetDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A <c>Target</c> instance.</returns>
        public Target GetSingle(Guid id)
        {
            TargetDto targetData;
            targetData = _targets.Find<TargetDto>(t => t.Id == id).FirstOrDefault();

            Target target = Target.Translate(targetData);
            return target;
        }

        /// <summary>
        /// Retrieve a lsit of <c>Target</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Target</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Target> GetPage(int page, int pageSize, DateTime minval)
        {
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
            int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

            List<TargetDto> data = _targets
                .Find<TargetDto>(t => t.DateCreated > minval)
                .SortByDescending<TargetDto, TargetDto>(t => t.DateCreated)
                .Skip(skipVal)
                .Limit(pageSize)
                .ToList<TargetDto>();
            List<Target> list = Target.Translate(data).ToList();

            return list;
        }

        public void Insert(Target target)
        {

            TargetDto data = new TargetDto()
            {
                Id = Guid.NewGuid(),
                Name = target.Name,
                Region = target.Region,
                CollectionType = target.CollectionType,
                Selected = target.Selected,
                DocumentRelation = target.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            };

            _targets.InsertOne(data);
        }

        public void Insert(IEnumerable<Target> targets)
        {
            List<TargetDto> data = new List<TargetDto>();
            targets.ToList().ForEach(t => data.Add(new TargetDto()
            {
                Id = Guid.NewGuid(),
                Name = t.Name,
                Region = t.Region,
                CollectionType = t.CollectionType,
                Selected = t.Selected,
                DocumentRelation = t.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _targets.InsertMany(data);
        }

        public int Update(Guid docId, Target target)
        {
            var updateDef = Builders<TargetDto>
                .Update
                    .Set(t => t.Name, target.Name)
                    .Set(t => t.Region, target.Region)
                    .Set(t => t.CollectionType, target.CollectionType)
                    .Set(t => t.Selected, target.Selected)
                    .Set(t => t.DocumentRelation, target.DocumentRelation)
                    .Set(t => t.UpdatedAt, DateTime.Now);
                    //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _targets.UpdateOne<TargetDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        public int PartialUpdate(Guid docId, Target target, IEnumerable<string> ops)
        {
            // TODO : Figure out how to properly implement a partial update
            // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
            var updateDef = Builders<TargetDto>
                .Update
                    .Set(t => t.Name, target.Name)
                    .Set(t => t.Region, target.Region)
                    .Set(t => t.CollectionType, target.CollectionType)
                    .Set(t => t.Selected, target.Selected)
                    .Set(t => t.DocumentRelation, target.DocumentRelation)
                    .Set(t => t.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _targets.UpdateOne<TargetDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Deletes a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int Remove(Guid docId)
        {
            DeleteResult result = _targets.DeleteOne<TargetDto>(t => t.Id == docId);
            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Updates a <c>TargetDto</c> object as the configured "chosen" Target.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int SetTarget(Guid docId)
        {
            var updateDef = Builders<TargetDto>
                .Update
                    .Set(t => t.Selected, true)
                    .Set(t => t.UpdatedAt, DateTime.Now);
                //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _targets.UpdateOne<TargetDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }
    }
}
