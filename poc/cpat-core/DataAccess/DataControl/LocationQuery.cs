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

        public IEnumerable<Location> GetCollection(IEnumerable<Guid> ids)
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

            return new List<Location>();
        }

        /// <summary>
        /// Insert a single <c>Location</c> object.
        /// </summary>
        /// <param name="device"></param>
        public void Insert(Location device)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<LocationDto>(LocationDto.Translate(device));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Location</c> objects.
        /// </summary>
        /// <param name="devices"></param>
        public void Insert(IEnumerable<Location> devices)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<LocationDto>(LocationDto.Translate(devices.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>LocationDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Location</c>. This will be translated to a <c>LocationDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Location device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(LocationDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>LocationDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Location</c>. This will be translated to a <c>LocationDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Location device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(LocationDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
