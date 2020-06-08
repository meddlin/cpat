using cpat_core.DataAccess.DataTransferModels.Cockroach.TargetTypes;
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
        private const string _TABLE_NAME_ = "company";

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
                    company = Company.Translate(
                        db.Fetch<CompanyDto>(new NPoco.Sql(
                            $@"
                                select * 
                                from {_TABLE_NAME_}
                                where id  = @0
                            ", id)).FirstOrDefault()
                    );
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
        /// Retrieve a lsit of <c>Company</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Company</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Company> GetPage(int page, int pageSize, DateTime minval)
        {
            var list = new List<Company>();
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    // NOTE: This hard-coding a minimum date value is a temporary fix. Later on, we
                    //      want to change this to some minimum value of the TIMESTAMP data type.
                    list = Company.Translate(
                        db.Fetch<CompanyDto>(new NPoco.Sql(
                            $@"select * 
                                from {_TABLE_NAME_}
                                where datecreated > TIMESTAMP '2000-01-01'
                                order by datecreated desc
                                limit {pageSize}"
                        ))
                    ).ToList();

                    db.Connection.Close();
                }
            }

            return list;
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
        /// Partial update for <c>CompanyDto</c> by only updating the specified columns.
        /// </summary>
        /// <param name="docId"></param>
        /// <param name="company"></param>
        /// <param name="ops">A <c>string</c> collection </param>
        /// <returns></returns>
        public int PartialUpdate(Guid docId, Company company, IEnumerable<string> ops)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(CompanyDto.Translate(company), docId, ops);
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
