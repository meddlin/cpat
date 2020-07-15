using Npgsql;
using NPoco;
using PocoCrdb.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocoCrdb.DataStore
{
    public class Database
    {
        private string connectionString = "";

        public Database()
        {
            var connStringBuilder = new NpgsqlConnectionStringBuilder();
            connStringBuilder.Host = "localhost";
            connStringBuilder.Port = 26257;
            connStringBuilder.SslMode = SslMode.Disable;
            connStringBuilder.Username = "maxroach";
            connStringBuilder.Database = "bank";

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

        public IEnumerable<Account> GetAll()
        {
            var results = new List<Account>();

            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    results = db.Fetch<Account>();
                    db.Connection.Close();
                }
            }

            return results;
        }

        public Account GetSingle(string id)
        {
            Account acc;

            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    acc = db.Fetch<Account>().Where(a => a.Id == new Guid(id)).FirstOrDefault();
                    db.Connection.Close();
                }
            }

            return acc;
        }


        // Npgsql.Postgresql exception 42703: https://github.com/npgsql/npgsql/issues/1656
        //db.Insert<Account>(account);

        // Invalid cast System.Int64 to System.Guid
        public void Insert(Account account)
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Insert<Account>("accounts", "id", account);
                    db.Connection.Close();
                }
            }
        }

        public void Upsert(Account account)
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<Account>(account); // upsert action
                    db.Connection.Close();
                }
            }
        }

        public void Update(Account account)
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {y
                    db.Connection.Open();
                    var res = db.Update(account);
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a record by using NPoco's snapshot feature to only update the columns that were changed.
        /// </summary>
        /// <see cref="https://github.com/schotime/NPoco/wiki/Change-tracking-for-updates"/>
        /// <param name="id"></param>
        /// <param name="account"></param>
        public void UpdateWithSnapshot(string id, Account account)
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    var acc = db.SingleById<Account>(new Guid(id));
                    var snapshot = db.StartSnapshot(acc);
                    acc.AccountOwner = account.AccountOwner;

                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update only specific fields of a record (only certain columns in the DB) without using <c>NPoco.Snapshot</c>
        /// </summary>
        /// <see cref="https://github.com/schotime/NPoco/issues/362"/>
        /// <param name="id"></param>
        /// <param name="account"></param>
        public void UpdateManyTrick(string id, Account account) 
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    var res = db.UpdateMany<Account>()
                        .OnlyFields(a => a.AccountOwner)
                        .Where(a => a.Id == new Guid(id))
                        .Execute(new Account { AccountOwner = account.AccountOwner });

                    Console.WriteLine($"UpdateManyTrick -- Result: {res.ToString()}");
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Remove a single <c>Account</c> record from the table.
        /// </summary>
        /// <param name="account"></param>
        public void Remove(Account account)
        {
            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    var res = db.Delete<Account>(account);

                    Console.WriteLine($"Remove -- Result: {res.ToString()}");
                    db.Connection.Close();
                }
            }
        }

        public void ComplicatedQueryExecution()
        {
            string col3 = "someColumnName";
            const string MyTableName = "some_special_table";

            using (var conn = new NpgsqlConnection(connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    var res = db.Execute(new Sql($@"
                        WITH bankers_cte AS (SELECT * FROM employees WHERE type == 'banker')

                        select col1, col2, {col3}
                        from {MyTableName} sst
                        where sst.col1 == bankers_cte.colX", col3));

                    db.Connection.Close();
                }
            }
        }
    }
}
