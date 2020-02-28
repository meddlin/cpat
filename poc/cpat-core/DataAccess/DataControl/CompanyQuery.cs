using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using System;
using System.Collections.Generic;
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

        /// <summary>
        /// Retrieve a single <c>Company</c>.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        public IEnumerable<Company> GetCollection(IEnumerable<Guid> ids)
        {
            //using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            //{
            //    using (var db = new NPoco.Database(conn))
            //    {
            //        db.Connection.Open();

            //        db.

            //        db.Connection.Close();
            //    }
            //}

            return new List<Company>();
        }

        /// <summary>
        /// Insert a single <c>Company</c> object.
        /// </summary>
        /// <param name="company"></param>
        public void Insert(Company company)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<CompanyDto>(CompanyDto.Translate(company));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Company</c> objects.
        /// </summary>
        /// <param name="companies"></param>
        public void Insert(IEnumerable<Company> companies)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<CompanyDto>(CompanyDto.Translate(companies.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>CompanyDto</c> object.
        /// </summary>
        /// <param name="company">A <c>Comapny</c>. This will be translated to a <c>ComapnyDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Company company)
        {
            int res;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(CompanyDto.Translate(company));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>CompanyDto</c> object.
        /// </summary>
        /// <param name="company">A <c>Comapny</c>. This will be translated to a <c>ComapnyDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Company company)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(CompanyDto.Translate(company));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
