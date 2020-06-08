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
using static cpat_core.DataAccess.DataControl.Mongo.MongoPublisher;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class TargetDbService
    {
        //public Mongo.Database.Database dbAccess;
        private readonly IMongoCollection<TargetDto> _targets;
        private readonly IHubContext<TargetHub> _hubContext;
        
        private List<Task> publisherList = new List<Task>();
        

        public TargetDbService(IConfiguration config, IHubContext<TargetHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpat_data");
            _targets = database.GetCollection<TargetDto>("target");

            _hubContext = hubContext;
        }
        

        //public static void DelegateMongoWatch(IMongoCollection<TargetDto> targets, PipelineDefinition<ChangeStreamDocument<TargetDto>, ChangeStreamDocument<TargetDto>> pipeline, ChangeStreamOptions options)
        //{
        //    // IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch(pipeline, options);
        //    IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch();

        //    ChangeStreamDocument<TargetDto> nextDoc;

        //    while (cursor.MoveNext() && cursor.Current.Count() == 0) { }
        //    nextDoc = cursor.Current.First();

        //    cursor.Dispose();
        //}

        internal void EmitMessage(object sender, TargetMessageEventArgs e)
        {
            Console.WriteLine($"back in TargetDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
            // task.RunSynchronously();
        }

        public async Task SendMessage(TargetDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-TargetById", data);
        }

        public void Subscribe(PipelineDefinition<ChangeStreamDocument<TargetDto>, ChangeStreamDocument<TargetDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new MongoPublisher(_targets, pipeline, options);
            mp.MessageEmitted += EmitMessage;

            // Start publisher
            mp.Kickoff();
        }

        public void Unsubscribe() // pass in 'id' associated with a MongoPublisher
        {
            // get associated MongoPublisher from publisherList
            // mp.StopChangeStream(); // issue a "stop stream" on the obtained MongoPublisher
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

        public IEnumerable<Target> GetPage(int page, int pageSize, DateTime minval)
        {
            return new List<Target>();
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
                // DocumentRelation = target.DocumentRelation,
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
                // DocumentRelation = target.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _targets.InsertMany(data);
        }

        public int Update(Guid docId, Target target)
        {
            int res = 0;
            return res;
        }

        public int PartialUpdate(Guid docId, Target target, IEnumerable<string> ops)
        {
            int res = 0;
            return res;
        }

        public int Remove(Target target)
        {
            int res = 0;
            return res;
        }

        public int SetTarget(string target)
        {
            int res = 0;
            return res;
        }
    }
}
