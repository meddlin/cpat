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
using static cpat_core.DataAccess.DataControl.Mongo.Publishers.DeviceMongoPublisher;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class DeviceDbService
    {
        private readonly IMongoCollection<DeviceDto> _devices;
        private readonly IHubContext<DeviceHub> _hubContext;
        private List<DeviceMongoPublisher> publisherList = new List<DeviceMongoPublisher>();

        public DeviceDbService(IConfiguration config, IHubContext<DeviceHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpat_data");
            _devices = database.GetCollection<DeviceDto>("device");

            _hubContext = hubContext;
        }

        internal void EmitMessage(object sender, DeviceMessageEventArgs e)
        {
            Console.WriteLine($"back in DeviceDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
        }

        /// <summary>
        /// Send data to connected clients via SignalR.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task SendMessage(DeviceDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-DeviceById", data);
        }

        /// <summary>
        /// Setup a <c>MongoPublisher</c>, start a <c>Task</c> for change data capture, and setup a listener
        /// to push results back to clients.
        /// </summary>
        /// <param name="pipeline"></param>
        /// <param name="options"></param>
        public Guid Subscribe(PipelineDefinition<ChangeStreamDocument<DeviceDto>, ChangeStreamDocument<DeviceDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new DeviceMongoPublisher(_devices, pipeline, options);
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
        /// Retrieve a single <c>evice</c> from MongoDB using <c>eviceDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A <c>evice</c> instance.</returns>
        public Device GetSingle(Guid id)
        {
            DeviceDto deviceData;
            deviceData = _devices.Find<DeviceDto>(t => t.Id == id).FirstOrDefault();

            Device device = Device.Translate(deviceData);
            return device;
        }

        /// <summary>
        /// Retrieve a lsit of <c>Device</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Device</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Device> GetPage(int page, int pageSize, DateTime minval)
        {
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
            int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

            List<DeviceDto> data = _devices
                .Find<DeviceDto>(t => t.DateCreated > minval)
                .SortByDescending<DeviceDto, DeviceDto>(t => t.DateCreated)
                .Skip(skipVal)
                .Limit(pageSize)
                .ToList<DeviceDto>();
            List<Device> list = Device.Translate(data).ToList();

            return list;
        }

        public void Insert(Device device)
        {

            DeviceDto data = new DeviceDto()
            {
                Id = Guid.NewGuid(),
                Name = device.Name,
                Organizations = device.Organizations,
                DocumentRelation = device.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            };

            _devices.InsertOne(data);
        }

        public void Insert(IEnumerable<Device> devices)
        {
            List<DeviceDto> data = new List<DeviceDto>();
            devices.ToList().ForEach(d => data.Add(new DeviceDto()
            {
                Id = Guid.NewGuid(),
                Name = d.Name,
                Organizations = d.Organizations,
                DocumentRelation = d.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _devices.InsertMany(data);
        }

        public int Update(Guid docId, Device device)
        {
            var updateDef = Builders<DeviceDto>
                .Update
                    .Set(d => d.Name, device.Name)
                    .Set(d => d.Organizations, device.Organizations)
                    .Set(d => d.DocumentRelation, device.DocumentRelation)
                    .Set(d => d.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _devices.UpdateOne<DeviceDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        public int PartialUpdate(Guid docId, Device device, IEnumerable<string> ops)
        {
            // TODO : Figure out how to properly implement a partial update
            // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
            var updateDef = Builders<DeviceDto>
                .Update
                    .Set(d => d.Name, device.Name)
                    .Set(d => d.Organizations, device.Organizations)
                    .Set(d => d.DocumentRelation, device.DocumentRelation)
                    .Set(d => d.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _devices.UpdateOne<DeviceDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Deletes a <c>DeviceDto</c> object.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int Remove(Guid docId)
        {
            DeleteResult result = _devices.DeleteOne<DeviceDto>(t => t.Id == docId);
            return result.IsAcknowledged ? 1 : 0;
        }
    }
}
