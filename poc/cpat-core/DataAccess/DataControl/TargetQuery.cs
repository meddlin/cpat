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

        public IEnumerable<Target> GetCollection(IEnumerable<Guid> ids)
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

            return new List<Target>();
        }

        /// <summary>
        /// Insert a single <c>Target</c> object.
        /// </summary>
        /// <param name="device"></param>
        public void Insert(Target device)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<TargetDto>(TargetDto.Translate(device));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Target</c> objects.
        /// </summary>
        /// <param name="devices"></param>
        public void Insert(IEnumerable<Target> devices)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<TargetDto>(TargetDto.Translate(devices.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Target</c>. This will be translated to a <c>TargetDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Target device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(TargetDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Target</c>. This will be translated to a <c>TargetDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Target device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(TargetDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
