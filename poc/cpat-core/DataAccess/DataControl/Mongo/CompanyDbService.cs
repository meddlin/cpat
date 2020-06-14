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
using static cpat_core.DataAccess.DataControl.Mongo.Publishers.CompanyMongoPublisher;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class CompanyDbService
    {
        private readonly IMongoCollection<CompanyDto> _companies;
        private readonly IHubContext<CompanyHub> _hubContext;
        private List<CompanyMongoPublisher> publisherList = new List<CompanyMongoPublisher>();


        public CompanyDbService(IConfiguration config, IHubContext<CompanyHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpat_data");
            _companies = database.GetCollection<CompanyDto>("company");

            _hubContext = hubContext;
        }

        internal void EmitMessage(object sender, CompanyMessageEventArgs e)
        {
            Console.WriteLine($"back in CompanyDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
        }

        /// <summary>
        /// Send data to connected clients via SignalR.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task SendMessage(CompanyDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-CompanyById", data);
        }

        /// <summary>
        /// Setup a <c>MongoPublisher</c>, start a <c>Task</c> for change data capture, and setup a listener
        /// to push results back to clients.
        /// </summary>
        /// <param name="pipeline"></param>
        /// <param name="options"></param>
        public Guid Subscribe(PipelineDefinition<ChangeStreamDocument<CompanyDto>, ChangeStreamDocument<CompanyDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new CompanyMongoPublisher(_companies, pipeline, options);
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
        /// Retrieve a single <c>Company</c> from MongoDB using <c>CompanyDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A <c>Company</c> instance.</returns>
        public Company GetSingle(Guid id)
        {
            CompanyDto targetData;
            targetData = _companies.Find<CompanyDto>(t => t.Id == id).FirstOrDefault();

            Company target = Company.Translate(targetData);
            return target;
        }

        /// <summary>
        /// Retrieve a lsit of <c>Company</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Company</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Company> GetPage(int page, int pageSize, DateTime minval)
        {
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
            int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

            List<CompanyDto> data = _companies
                .Find<CompanyDto>(t => t.DateCreated > minval)
                .SortByDescending<CompanyDto, CompanyDto>(t => t.DateCreated)
                .Skip(skipVal)
                .Limit(pageSize)
                .ToList<CompanyDto>();
            List<Company> list = Company.Translate(data).ToList();

            return list;
        }

        public void Insert(Company company)
        {

            CompanyDto data = new CompanyDto()
            {
                Id = Guid.NewGuid(),
                Name = company.Name,
                DocumentRelation = company.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            };

            _companies.InsertOne(data);
        }

        public void Insert(IEnumerable<Company> companies)
        {
            List<CompanyDto> data = new List<CompanyDto>();
            companies.ToList().ForEach(c => data.Add(new CompanyDto()
            {
                Id = Guid.NewGuid(),
                Name = c.Name,
                DocumentRelation = c.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _companies.InsertMany(data);
        }

        public int Update(Guid docId, Company company)
        {
            var updateDef = Builders<CompanyDto>
                .Update
                    .Set(c => c.Name, company.Name)
                    .Set(c => c.DocumentRelation, company.DocumentRelation)
                    .Set(c => c.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _companies.UpdateOne<CompanyDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        public int PartialUpdate(Guid docId, Company company, IEnumerable<string> ops)
        {
            // TODO : Figure out how to properly implement a partial update
            // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
            var updateDef = Builders<CompanyDto>
                .Update
                    .Set(c => c.Name, company.Name)
                    .Set(c => c.DocumentRelation, company.DocumentRelation)
                    .Set(c => c.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _companies.UpdateOne<CompanyDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Deletes a <c>CompanyDto</c> object.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int Remove(Guid docId)
        {
            DeleteResult result = _companies.DeleteOne<CompanyDto>(t => t.Id == docId);
            return result.IsAcknowledged ? 1 : 0;
        }
    }
}
