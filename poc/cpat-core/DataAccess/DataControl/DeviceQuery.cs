using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class DeviceQuery
    {
        public Database dbAccess;

        public DeviceQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        public Device GetSingle(Guid id)
        {
            Device device;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    device = Device.Translate(db.Fetch<DeviceDto>().FirstOrDefault());
                    db.Connection.Close();
                }
            }

            return device;
        }
    }
}
