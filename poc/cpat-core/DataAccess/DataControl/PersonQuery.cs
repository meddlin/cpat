using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class PersonQuery
    {
        public Database dbAccess;

        public PersonQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        public Person GetSingle(Guid id)
        {
            Person device;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    device = Person.Translate(db.Fetch<PersonDto>().FirstOrDefault());
                    db.Connection.Close();
                }
            }

            return device;
        }
    }
}
