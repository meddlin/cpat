using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl.Mongo
{
    /// <summary>
    /// Handles listening to MongoDB change streams and publishes data back to database services.
    /// </summary>
    public class MongoPublisher
    {
        public Action action;
        private Task t { get; }
        private CancellationTokenSource tokenSource = new CancellationTokenSource();
        private CancellationToken cancelToken;

        public event EventHandler<TargetMessageEventArgs> MessageEmitted;

        public MongoPublisher(IMongoCollection<TargetDto> targets, PipelineDefinition<ChangeStreamDocument<TargetDto>, ChangeStreamDocument<TargetDto>> pipeline, ChangeStreamOptions options)
        {
            action = () => { StartChangeStream(targets); };
            t = new Task(action);
        }

        /// <summary>
        /// Start the <c>Task</c> for the <c>MongoPublisher</c>.
        /// </summary>
        public void Kickoff() => t.Start();

        internal void StartChangeStream(IMongoCollection<TargetDto> targets)
        {
            // IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch(pipeline, options);
            IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor = targets.Watch();
            ChangeStreamDocument<TargetDto> nextDoc;

            while(true)
            {
                // if there is a new batch of documents in the cursor
                if (!(cursor.MoveNext() && cursor.Current.Count() == 0))
                {
                    nextDoc = cursor.Current.First();
                    MessageEncountered(nextDoc);
                }
            }
        }

        internal void StopChangeStream(IChangeStreamCursor<ChangeStreamDocument<TargetDto>> cursor)
        {
            cursor.Dispose();
        }

        private void MessageEncountered(ChangeStreamDocument<TargetDto> document)
        {
            OnEmitMessage(new TargetMessageEventArgs
            {
                MessageInfo = $"coming from OnEmitMessage: {document.FullDocument.Id} - {document.FullDocument.Name}",
                DocumentData = document.FullDocument
            });
        }


        protected virtual void OnEmitMessage(TargetMessageEventArgs e) => MessageEmitted?.Invoke(this, e);


        /// <summary>
        /// Custom <c>EventArgs</c> container for <c>MongoPublisher</c>.
        /// </summary>
        /// <remarks>
        /// Data sent from <c>MongoPublisher</c> to other classes is contained here.
        /// </remarks>
        public class TargetMessageEventArgs : EventArgs
        {
            public string MessageInfo { get; set; }
            public TargetDto DocumentData { get; set; }
        }
    }
}
