using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Linq;

namespace cpat_core.DataAccess.DataControl
{
    public class CompanyQuery
    {
        private Database dbAccess;

        public CompanyQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        public Company GetSingle(Guid id)
        {
            Company company;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    company = Company.Translate(db.Fetch<CompanyDto>().FirstOrDefault());
                    db.Connection.Close();
                }
            }

            return company;
        }
    }
}
