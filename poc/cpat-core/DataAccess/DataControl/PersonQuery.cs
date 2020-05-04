using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using Npgsql;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class PersonQuery
    {
        public Database dbAccess;
        private const string _TABLE_NAME_ = "person";

        public PersonQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        public Person GetSingle(Guid id)
        {
            Person person;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    person = Person.Translate(
                        db.Fetch<PersonDto>(new Sql(
                            $@"
                            select * 
                            from {_TABLE_NAME_}
                            where id  = @0
                            ", id)).FirstOrDefault()    
                    );
                    db.Connection.Close();
                }
            }

            return person;
        }

        public IEnumerable<Person> GetCollection(IEnumerable<Guid> ids)
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

            return new List<Person>();
        }

        /// <summary>
        /// Retrieve a lsit of <c>Person</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Target</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Person> GetPage(int page, int pageSize, DateTime minval)
        {
            var list = new List<Person>();
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    // NOTE: This hard-coding a minimum date value is a temporary fix. Later on, we
                    //      want to change this to some minimum value of the TIMESTAMP data type.
                    list = Person.Translate(
                        db.Fetch<PersonDto>(new NPoco.Sql(
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
        /// Insert a single <c>Person</c> object.
        /// </summary>
        /// <param name="person"></param>
        public void Insert(Person person)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    
                    PersonDto pdto = PersonDto.Translate(person);
                    pdto.DateCreated = DateTime.Now;

                    db.Save<PersonDto>(pdto);
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Person</c> objects.
        /// </summary>
        /// <param name="devices"></param>
        public void Insert(IEnumerable<Person> devices)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<PersonDto>(PersonDto.Translate(devices.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>PersonDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Person</c>. This will be translated to a <c>PersonDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Person device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(PersonDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Partial update for <c>PersonDto</c> by only updating the specified columns.
        /// </summary>
        /// <param name="docId"></param>
        /// <param name="person"></param>
        /// <param name="ops">A <c>string</c> collection </param>
        /// <returns></returns>
        public int PartialUpdate(Guid docId, Person person, IEnumerable<string> ops)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(PersonDto.Translate(person), docId, ops);
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>PersonDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Person</c>. This will be translated to a <c>PersonDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Person device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(PersonDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
