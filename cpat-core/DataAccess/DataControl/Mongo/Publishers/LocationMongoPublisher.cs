using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl.Mongo.Publishers
{
    public class LocationMongoPublisher
    {
        public Action action;
        private Task t { get; }
        private CancellationTokenSource tokenSource = new CancellationTokenSource();
        private CancellationToken cancelToken;
        public Guid RegistrationId { get; private set; }
        private IChangeStreamCursor<ChangeStreamDocument<LocationDto>> cursor;

        public event EventHandler<LocationMessageEventArgs> MessageEmitted;

        public LocationMongoPublisher(IMongoCollection<LocationDto> collection,
            PipelineDefinition<ChangeStreamDocument<LocationDto>, ChangeStreamDocument<LocationDto>> pipeline,
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

        internal void StartChangeStream(IMongoCollection<LocationDto> collection)
        {
            // IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch(pipeline, options);
            cursor = collection.Watch();
            ChangeStreamDocument<LocationDto> nextDoc;

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

        private void MessageEncountered(ChangeStreamDocument<LocationDto> document)
        {
            OnEmitMessage(new LocationMessageEventArgs
            {
                MessageInfo = $"coming from OnEmitMessage: {document.FullDocument.Id} - {document.FullDocument.Name}",
                DocumentData = document.FullDocument
            });
        }

        protected virtual void OnEmitMessage(LocationMessageEventArgs e) => MessageEmitted?.Invoke(this, e);

        /// <summary>
        /// Custom <c>EventArgs</c> container for <c>MongoPublisher</c>.
        /// </summary>
        /// <remarks>
        /// Data sent from <c>MongoPublisher</c> to other classes is contained here.
        /// </remarks>
        public class LocationMessageEventArgs : EventArgs
        {
            public string MessageInfo { get; set; }
            public LocationDto DocumentData { get; set; }
        }
    }
}
