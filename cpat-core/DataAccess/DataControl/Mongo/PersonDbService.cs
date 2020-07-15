using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static cpat_core.DataAccess.DataControl.Mongo.Publishers.PersonMongoPublisher;
using cpat_core.DataAccess.DataControl.Mongo.Publishers;
using cpat_core.Hubs.Mongo;
using cpat_core.Models;
using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    public class PersonDbService
    {
        private readonly IMongoCollection<PersonDto> _collection;
        private readonly IHubContext<PersonHub> _hubContext;
        private List<PersonMongoPublisher> publisherList = new List<PersonMongoPublisher>();

        public PersonDbService(IConfiguration config, IHubContext<PersonHub> hubContext)
        {
            var client = new MongoClient(config.GetConnectionString("CPAT_DATASTORE"));
            var database = client.GetDatabase("cpatdb");
            _collection = database.GetCollection<PersonDto>("person");

            _hubContext = hubContext;
        }

        internal void EmitMessage(object sender, PersonMessageEventArgs e)
        {
            Console.WriteLine($"back in TargetDbServer: {e.MessageInfo}");

            Task.Run(async () => await SendMessage(e.DocumentData));
        }

        /// <summary>
        /// Send data to connected clients via SignalR.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task SendMessage(PersonDto data)
        {
            await _hubContext.Clients.All.SendAsync("Receive-TargetById", data);
        }

        /// <summary>
        /// Setup a <c>MongoPublisher</c>, start a <c>Task</c> for change data capture, and setup a listener
        /// to push results back to clients.
        /// </summary>
        /// <param name="pipeline"></param>
        /// <param name="options"></param>
        public Guid Subscribe(PipelineDefinition<ChangeStreamDocument<PersonDto>, ChangeStreamDocument<PersonDto>> pipeline, ChangeStreamOptions options)
        {
            // Setup publisher
            var mp = new PersonMongoPublisher(_collection, pipeline, options);
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
        /// Retrieve a single <c>Person</c> from MongoDB using <c>PersonDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A <c>Person</c> instance.</returns>
        public Person GetSingle(Guid id)
        {
            PersonDto personData;
            personData = _collection.Find<PersonDto>(t => t.Id == id).FirstOrDefault();

            Person person = Person.Translate(personData);
            return person;
        }

        /// <summary>
        /// Retrieve a lsit of <c>Person</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Target</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Person> GetPage(int page, int pageSize, DateTime minval)
        {
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;
            int skipVal = (page == 1) ? 0 : ((page - 1) * pageSize);

            List<PersonDto> data = _collection
                .Find<PersonDto>(t => t.DateCreated > minval)
                .SortByDescending<PersonDto, PersonDto>(t => t.DateCreated)
                .Skip(skipVal)
                .Limit(pageSize)
                .ToList<PersonDto>();
            List<Person> list = Person.Translate(data).ToList();

            return list;
        }

        public void Insert(Person person)
        {
            PersonDto data = new PersonDto()
            {
                Id = Guid.NewGuid(),
                FirstName = person.FirstName,
                MiddleName = person.MiddleName,
                LastName = person.LastName,
                Nicknames = person.Nicknames,
                PhoneNumbers = person.PhoneNumbers,
                EmailAddresses = person.EmailAddresses,
                Organizations = person.Organizations,
                Employers = person.Employers,
                SocialLinks = person.SocialLinks,

                DocumentRelation = person.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            };

            _collection.InsertOne(data);
        }

        public void Insert(IEnumerable<Person> people)
        {
            List<PersonDto> data = new List<PersonDto>();
            people.ToList().ForEach(p => data.Add(new PersonDto()
            {
                Id = Guid.NewGuid(),
                FirstName = p.FirstName,
                MiddleName = p.MiddleName,
                LastName = p.LastName,
                Nicknames = p.Nicknames,
                PhoneNumbers = p.PhoneNumbers,
                EmailAddresses = p.EmailAddresses,
                Organizations = p.Organizations,
                Employers = p.Employers,
                SocialLinks = p.SocialLinks,
                DocumentRelation = p.DocumentRelation,
                DateCreated = DateTime.Now,
                UpdatedAt = DateTime.Now
                // LastModifiedByUserId = target.LastModifiedBy
            }));

            _collection.InsertMany(data);
        }

        public int Update(Guid docId, Person person)
        {
            var updateDef = Builders<PersonDto>
                .Update
                    .Set(p => p.FirstName, person.FirstName)
                    .Set(p => p.MiddleName, person.MiddleName)
                    .Set(p => p.LastName, person.LastName)
                    .Set(p => p.Nicknames, person.Nicknames)
                    .Set(p => p.PhoneNumbers, person.PhoneNumbers)
                    .Set(p => p.EmailAddresses, person.EmailAddresses)
                    .Set(p => p.Organizations, person.Organizations)
                    .Set(p => p.Employers, person.Employers)
                    .Set(p => p.SocialLinks, person.SocialLinks)
                    .Set(p => p.DocumentRelation, person.DocumentRelation)
                    .Set(p => p.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _collection.UpdateOne<PersonDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        public int PartialUpdate(Guid docId, Person person, IEnumerable<string> ops)
        {
            // TODO : Figure out how to properly implement a partial update
            // Ref: https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
            var updateDef = Builders<PersonDto>
                .Update
                    .Set(p => p.FirstName, person.FirstName)
                    .Set(p => p.MiddleName, person.MiddleName)
                    .Set(p => p.LastName, person.LastName)
                    .Set(p => p.Nicknames, person.Nicknames)
                    .Set(p => p.PhoneNumbers, person.PhoneNumbers)
                    .Set(p => p.EmailAddresses, person.EmailAddresses)
                    .Set(p => p.Organizations, person.Organizations)
                    .Set(p => p.Employers, person.Employers)
                    .Set(p => p.SocialLinks, person.SocialLinks)
                    .Set(p => p.DocumentRelation, person.DocumentRelation)
                    .Set(p => p.UpdatedAt, DateTime.Now);
            //.Set(t => t.LastModifiedByUserId, target.LastModifiedBy)

            UpdateResult result = _collection.UpdateOne<PersonDto>(t => t.Id == docId, updateDef);

            return result.IsAcknowledged ? 1 : 0;
        }

        /// <summary>
        /// Deletes a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="docId"></param>
        /// <returns></returns>
        public int Remove(Guid docId)
        {
            DeleteResult result = _collection.DeleteOne<PersonDto>(t => t.Id == docId);
            return result.IsAcknowledged ? 1 : 0;
        }
    }
}
