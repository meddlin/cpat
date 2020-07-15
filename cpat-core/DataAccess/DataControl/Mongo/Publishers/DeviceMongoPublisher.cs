using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl.Mongo.Publishers
{
    public class DeviceMongoPublisher
    {
        public Action action;
        private Task t { get; }
        private CancellationTokenSource tokenSource = new CancellationTokenSource();
        private CancellationToken cancelToken;
        public Guid RegistrationId { get; private set; }
        private IChangeStreamCursor<ChangeStreamDocument<DeviceDto>> cursor;

        public event EventHandler<DeviceMessageEventArgs> MessageEmitted;

        public DeviceMongoPublisher(IMongoCollection<DeviceDto> targets,
            PipelineDefinition<ChangeStreamDocument<DeviceDto>, ChangeStreamDocument<DeviceDto>> pipeline,
            ChangeStreamOptions options)
        {
            cancelToken = tokenSource.Token;
            action = () => { StartChangeStream(targets); };
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

        internal void StartChangeStream(IMongoCollection<DeviceDto> targets)
        {
            // IChangeStreamCursor<ChangeStreamDocument<DeviceDto>> cursor = targets.Watch(pipeline, options);
            cursor = targets.Watch();
            ChangeStreamDocument<DeviceDto> nextDoc;

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

        private void MessageEncountered(ChangeStreamDocument<DeviceDto> document)
        {
            OnEmitMessage(new DeviceMessageEventArgs
            {
                MessageInfo = $"coming from OnEmitMessage: {document.FullDocument.Id} - {document.FullDocument.Name}",
                DocumentData = document.FullDocument
            });
        }


        protected virtual void OnEmitMessage(DeviceMessageEventArgs e) => MessageEmitted?.Invoke(this, e);

        /// <summary>
        /// Custom <c>EventArgs</c> container for <c>MongoPublisher</c>.
        /// </summary>
        /// <remarks>
        /// Data sent from <c>MongoPublisher</c> to other classes is contained here.
        /// </remarks>
        public class DeviceMessageEventArgs : EventArgs
        {
            public string MessageInfo { get; set; }
            public DeviceDto DocumentData { get; set; }
        }
    }
}
