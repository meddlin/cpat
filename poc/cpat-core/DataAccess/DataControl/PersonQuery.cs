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
        /// Insert a single <c>Person</c> object.
        /// </summary>
        /// <param name="device"></param>
        public void Insert(Person device)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<PersonDto>(PersonDto.Translate(device));
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
