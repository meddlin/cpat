using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class TargetQuery
    {
        private Database dbAccess;

        public TargetQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        /// <summary>
        /// Retrieve a single <c>Target</c> from the database using <c>TargetDto</c> as a mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Target GetSingle(Guid id)
        {
            Target target;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    target = Target.Translate(db.Fetch<TargetDto>().FirstOrDefault());
                    db.Connection.Close();
                }
            }

            return target;
        }
    }
}
