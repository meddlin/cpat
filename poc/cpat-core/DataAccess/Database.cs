using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess
{
    public class Database
    {
        public string connectionString = "";

        public Database()
        {
            var connStringBuilder = new NpgsqlConnectionStringBuilder();
            connStringBuilder.Host = "localhost";
            connStringBuilder.Port = 26257;
            connStringBuilder.SslMode = SslMode.Disable;
            connStringBuilder.Username = "maxroach";
            connStringBuilder.Database = "cpat";

            connectionString = connStringBuilder.ConnectionString;

            //using (var conn = new NpgsqlConnection(connectionString))
            //{
            //    conn.Open();
            //    // create a new table
            //    new NpgsqlCommand("create table if not exists accounts (id serial primary key, balance int)", conn).ExecuteNonQuery();

            //    // insert two rows into the table
            //    using (var cmd = new NpgsqlCommand())
            //    {
            //        cmd.Connection = conn;
            //        cmd.CommandText = "upsert into accounts(balance) values(@val1)";
            //        //cmd.Parameters.AddWithValue("id1", value);
            //        cmd.Parameters.AddWithValue("val1", 10);
            //        cmd.ExecuteNonQuery();
            //    }
            //}
        }
    }
}
