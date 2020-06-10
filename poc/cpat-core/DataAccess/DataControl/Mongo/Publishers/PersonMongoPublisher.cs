using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl.Mongo.Publishers
{
    public class PersonMongoPublisher
    {
        public Action action;
        private Task t { get; }
        private CancellationTokenSource tokenSource = new CancellationTokenSource();
        private CancellationToken cancelToken;
        public Guid RegistrationId { get; private set; }
        private IChangeStreamCursor<ChangeStreamDocument<PersonDto>> cursor;

        public event EventHandler<PersonMessageEventArgs> MessageEmitted;


        public PersonMongoPublisher(IMongoCollection<PersonDto> collection,
            PipelineDefinition<ChangeStreamDocument<PersonDto>, ChangeStreamDocument<PersonDto>> pipeline,
            ChangeStreamOptions options)
        {
            cancelToken = tokenSource.Token;
            action = () => { StartChangeStream(collection); };
            t = new Task(action, cancelToken);
        }

        /// <summary>
        /// Create a registration id <c>Guid</c> for the <c>MongoPublisher</c> instance
        /// and return the id.
        /// </summary>
        /// <returns></returns>
        public Guid Register()
        {
            RegistrationId = Guid.NewGuid();
            return RegistrationId;
        }

        /// <summary>
        /// Start the <c>Task</c> for the <c>MongoPublisher</c>.
        /// </summary>
        public void Kickoff() => t.Start();

        internal void StartChangeStream(IMongoCollection<PersonDto> collection)
        {
            // IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch(pipeline, options);
            cursor = collection.Watch();
            ChangeStreamDocument<PersonDto> nextDoc;

            while (true)
            {
                // if there is a new batch of documents in the cursor
                if (!(cursor.MoveNext() && cursor.Current.Count() == 0))
                {
                    nextDoc = cursor.Current.First();
                    MessageEncountered(nextDoc);
                }
            }
        }

        /// <summary>
        /// Stop publishing changestream and cleanup <c>Task</c>.
        /// </summary>
        internal void StopChangeStream()
        {
            // Issue task cancellation
            tokenSource.Cancel();

            // Dispose cursor
            cursor.Dispose();
        }

        private void MessageEncountered(ChangeStreamDocument<PersonDto> document)
        {
            OnEmitMessage(new PersonMessageEventArgs
            {
                MessageInfo = $"coming from OnEmitMessage: {document.FullDocument.Id} - {document.FullDocument.FirstName}",
                DocumentData = document.FullDocument
            });
        }


        protected virtual void OnEmitMessage(PersonMessageEventArgs e) => MessageEmitted?.Invoke(this, e);

        /// <summary>
        /// Custom <c>EventArgs</c> container for <c>MongoPublisher</c>.
        /// </summary>
        /// <remarks>
        /// Data sent from <c>MongoPublisher</c> to other classes is contained here.
        /// </remarks>
        public class PersonMessageEventArgs : EventArgs
        {
            public string MessageInfo { get; set; }
            public PersonDto DocumentData { get; set; }
        }
    }
}
