using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using cpat_core.Models;

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

                //var exampleDocRel = new List<DocumentRelation>();
                //exampleDocRel.Add(
                //                new DocumentRelation()
                //                {
                //                    CollectionName = "test",
                //                    DocumentId = Guid.NewGuid().ToString()
                //                }
                //            );

                var database = mongoDbClient.GetDatabase("cpat_data");
                IMongoCollection<MongoModels.TargetDto> targets = database.GetCollection<MongoModels.TargetDto>("target");
                for(int i = 0; i < 10; i++)
                {
                    targets.InsertOne(new MongoModels.TargetDto()
                    {
                        Id = new ObjectId(),
                        Name = $"TestTarget-{Guid.NewGuid().ToString()}",
                        Region = "US",
                        CollectionType = "Target",
                        Selected = false,
                        //DocumentRelation = exampleDocRel,
                        DateCreated = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        LastModifiedByUserId = new ObjectId()
                    });
                }


                var targetColl = mongoDbClient.GetDatabase("cpat_data").GetCollection<MongoModels.TargetDto>("target");

                var cursor = targetColl.Watch();
                ChangeStreamDocument<MongoModels.TargetDto> next;
                while (cursor.MoveNext() && cursor.Current.Count() == 0) 
                {
                }
                next = cursor.Current.First();
                cursor.Dispose();
            }
        }

        public Database(bool forLivefeed)
        {
            if (forLivefeed)
            {
                var conn = new NpgsqlConnection("Server=localhost;Port=26257;Database=cpat;User Id=root;");
                //var conn = new NpgsqlConnection("postgres://root@localhost:26257/cpat");
                connectionString = conn.ConnectionString;
            }
        }



        public void TryToParseRangefeedConnection()
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                using (var cmd = new NpgsqlCommand("EXPERIMENTAL CHANGEFEED FOR target;"))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        cmd.ExecuteNonQuery();

                        while (reader.Read())
                        {
                            Console.Write($"reader...: {reader.NextResult()}");
                        }
                    }
                }
            }
        }
    }
}
