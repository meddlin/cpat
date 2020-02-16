using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class LocationQuery
    {
        public Database dbAccess;

        public LocationQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        public Location GetSingle(Guid id)
        {
            Location device;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    device = Location.Translate(db.Fetch<LocationDto>().FirstOrDefault());
                    db.Connection.Close();
                }
            }

            return device;
        }
    }
}
