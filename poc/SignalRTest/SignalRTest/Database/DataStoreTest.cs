using Npgsql;
using NPoco;
using SignalRTest.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Database
{
    public class DataStoreTest
    {
        private string connstr = "";

        public DataStoreTest()
        {
            var connStringBuilder = new NpgsqlConnectionStringBuilder();
            connStringBuilder.Host = "localhost";
            connStringBuilder.Port = 26257;
            connStringBuilder.SslMode = SslMode.Disable;
            connStringBuilder.Username = "maxroach";
            connStringBuilder.Database = "bank";

            connstr = connStringBuilder.ConnectionString;
        }

        public void SimpleInsertTest(int value)
        {
            using (var conn = new NpgsqlConnection(connstr))
            {
                conn.Open();

                // create a new table
                new NpgsqlCommand("create table if not exists accounts (id serial primary key, balance int)", conn).ExecuteNonQuery();

                // insert two rows into the table
                using (var cmd = new NpgsqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "upsert into accounts(balance) values(@val1)";
                    //cmd.Parameters.AddWithValue("id1", value);
                    cmd.Parameters.AddWithValue("val1", value);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void InsertTarget(Target doc)
        {
            using (var conn = new NpgsqlConnection(connstr))
            {
                conn.Open();

                // create a new table
                new NpgsqlCommand($@"
                    create table if not exists targets (
                        id UUID primary key default gen_random_uuid(), 
                        name STRING, 
                        region STRING,
                        collectiontype STRING,
                        datecreated TIMESTAMPTZ,
                        lastupdated TIMESTAMPTZ
                    )
                ", conn).ExecuteNonQuery();
            }

            using (var db = new NPoco.Database(new NpgsqlConnection(connstr)))
            {
                db.Connection.Open();
                var res = db.Insert<Target>(doc);
                db.Connection.Close();
            }
        }

        public IEnumerable<Target> SelectAllTargets()
        {
            using (var conn = new NpgsqlConnection(connstr))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    var res = db.Fetch<Target>(new Sql("select * from targets"));
                    db.Connection.Close();

                    return res;
                }
            }

            //using (var conn = new NpgsqlConnection(connstr))
            //{
            //    conn.Open();
            //    using (var cmd = new NpgsqlCommand())
            //    {
            //        cmd.Connection = conn;
            //        cmd.CommandText = "select * from targets";
            //        var reader = cmd.ExecuteReader();
            //        var results = reader.Cast<Target>().ToList();
            //        return results;
            //    }
            //}
        }
    }
}
