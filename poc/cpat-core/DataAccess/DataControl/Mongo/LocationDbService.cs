using cpat_core.DataAccess.DataControl.Mongo.Publishers;
using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using cpat_core.Hubs.Mongo;
using cpat_core.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static cpat_core.DataAccess.DataControl.Mongo.Publishers.LocationMongoPublisher;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class LocationDbService
    {
        private readonly IMongoCollection<LocationDto> _collection;
        private readonly IHubContext<LocationHub> _hubContext;
        private List<LocationMongoPublisher> publisherList = new List<LocationMongoPublisher>();

        public LocationDbService(IConfiguration config, IHubContext<LocationHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpat_data");
            _collection = database.GetCollection<LocationDto>("location");

            _hubContext = hubContext;
        }

        internal void EmitMessage(object sender, LocationMessageEventArgs e)
        {
            Console.WriteLine($"back in TargetDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
        }

        /// <summary>
        /// Send data to connected clients via SignalR.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task SendMessage(LocationDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-TargetById", data);
        }

        /// <summary>
        /// Setup a <c>MongoPublisher</c>, start a <c>Task</c> for change data capture, and setup a listener
        /// to push results back to clients.
        /// </summary>
        /// <param name="pipeline"></param>
        /// <param name="options"></param>
        public Guid Subscribe(PipelineDefinition<ChangeStreamDocument<LocationDto>, ChangeStreamDocument<LocationDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new LocationMongoPublisher(_collection, pipeline, options);
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
        /// Retrieve a single <c>Location</c> from MongoDB using <c>LocationDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A <c>Location</c> instance.</returns>
        public Location GetSingle(Guid id)
        {
            LocationDto locationData;
            locationData = _collection.Find<LocationDto>(t => t.Id == id).FirstOrDefault();

            Location location = Location.Translate(locationData);
            return location;
        }

        /// <summary>
        /// Retrieve a lsit of <c>Location</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Target</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Location> GetPage(int page, int pageSize, DateTime minval)
        {
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
            int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

            List<LocationDto> data = _collection
                .Find<LocationDto>(t => t.DateCreated > minval)
                .SortByDescending<LocationDto, LocationDto>(t => t.DateCreated)
                .Skip(skipVal)
                .Limit(pageSize)
                .ToList<LocationDto>();
            List<Location> list = Location.Translate(data).ToList();

            return list;
        }

        public void Insert(Location location)
        {
            LocationDto data = new LocationDto()
            {
                Id = Guid.NewGuid(),
                Name = location.Name,
                Latitude = location.Latitude,
                Longitude = location.Longitude,

                DocumentRelation = location.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            };

            _collection.InsertOne(data);
        }

        public void Insert(IEnumerable<Location> locations)
        {
            List<LocationDto> data = new List<LocationDto>();
            locations.ToList().ForEach(l => data.Add(new LocationDto()
            {
                Id = Guid.NewGuid(),
                Name = l.Name,
                Latitude = l.Latitude,
                Longitude = l.Longitude,

                DocumentRelation = l.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _collection.InsertMany(data);
        }

        public int Update(Guid docId, Location location)
        {
            var updateDef = Builders<LocationDto>
                .Update
                    .Set(l => l.Name, location.Name)
                    .Set(l => l.Latitude, location.Latitude)
                    .Set(l => l.Longitude, location.Longitude)
                    
                    .Set(l => l.DocumentRelation, location.DocumentRelation)
                    .Set(l => l.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _collection.UpdateOne<LocationDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        public int PartialUpdate(Guid docId, Location location, IEnumerable<string> ops)
        {
            // TODO : Figure out how to properly implement a partial update
            // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
            var updateDef = Builders<LocationDto>
                .Update
                    .Set(l => l.Name, location.Name)
                    .Set(l => l.Latitude, location.Latitude)
                    .Set(l => l.Longitude, location.Longitude)

                    .Set(l => l.DocumentRelation, location.DocumentRelation)
                    .Set(l => l.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _collection.UpdateOne<LocationDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Deletes a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int Remove(Guid docId)
        {
            DeleteResult result = _collection.DeleteOne<LocationDto>(t => t.Id == docId);
            return result.IsAcknowledged ? 1 : 0;
        }
    }
}
