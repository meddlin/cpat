using System;
using Npgsql;

namespace cockroach_test_app
{
    class Program
    {
        static void Main(string[] args)
        {
            var connStringBuilder = new NpgsqlConnectionStringBuilder();
            connStringBuilder.Host = "localhost";
            connStringBuilder.Port = 26257;
            connStringBuilder.SslMode = SslMode.Disable;
            connStringBuilder.Username = "maxroach";
            connStringBuilder.Database = "bank";
            Simple(connStringBuilder.ConnectionString);

            Console.WriteLine("Hello World!");
        }

        static void Simple(string connString) {

            using (var conn = new NpgsqlConnection(connString)) 
            {
                conn.Open();

                // create a new table
                new NpgsqlCommand("create table if not exists accounts (id int primary key, balance int)", conn).ExecuteNonQuery();

                // insert two rows into the table
                using (var cmd = new NpgsqlCommand()) 
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "upsert into accounts(id, balance) values(@id1, @val1), (@id2, @val2)";
                    cmd.Parameters.AddWithValue("id1", 1);
                    cmd.Parameters.AddWithValue("val1", 1000);
                    cmd.Parameters.AddWithValue("id2", 2);
                    cmd.Parameters.AddWithValue("val2", 250);
                    cmd.ExecuteNonQuery();
                }

                Console.WriteLine("initial balances:");
                using (var cmd = new NpgsqlCommand("SELECT id, balance FROM accounts", conn))
                using (var reader = cmd.ExecuteReader())
                while (reader.Read())
                    Console.Write("\taccount {0}: {1}\n", reader.GetValue(0), reader.GetValue(1));
            }
        }
    }
}
