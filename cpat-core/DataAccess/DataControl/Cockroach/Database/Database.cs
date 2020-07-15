using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using cpat_core.Models;
using cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes;

namespace cpat_core.DataAccess
{
    public class Database
    {
        public string connectionString = "";

        public Database()
        {
            var connStringBuilder = new NpgsqlConnectionStringBuilder();
            connStringBuilder.Host = "localhost"; //connStringBuilder.Host = "192.168.1.250";
            connStringBuilder.Port = 26257;
            connStringBuilder.SslMode = SslMode.Disable;
            connStringBuilder.Username = "root"; //connStringBuilder.Username = "maxroach";
            connStringBuilder.Database = "cpat";

            connectionString = connStringBuilder.ConnectionString;
        }

        public Database(string type)
        {
            if (type == "mongo")
            {
                MongoClient mongoDbClient = new MongoClient("mongodb://192.168.1.44:30001");
                var dbList = mongoDbClient.ListDatabases().ToList();

                foreach( var db in dbList)
                {
                    Console.WriteLine(db);
                }

                var database = mongoDbClient.GetDatabase("cpat_data");
                IMongoCollection<TargetDto> targets = database.GetCollection<TargetDto>("target");
                for(int i = 0; i < 10; i++)
                {
                    targets.InsertOne(new TargetDto()
                    {
                        Id = Guid.NewGuid(),
                        Name = $"TestTarget-{Guid.NewGuid().ToString()}",
                        Region = "US",
                        CollectionType = "Target",
                        Selected = false,
                        //DocumentRelation = exampleDocRel,
                        DateCreated = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        LastModifiedByUserId = Guid.NewGuid()
                    });
                }

                var targetColl = mongoDbClient.GetDatabase("cpat_data").GetCollection<TargetDto>("target");

                var cursor = targetColl.Watch();
                ChangeStreamDocument<TargetDto> next;
                while (cursor.MoveNext() && cursor.Current.Count() == 0) 
                {
                }
                next = cursor.Current.First();
                cursor.Dispose();
            }
        }


    }
}
