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

        /// <summary>
        /// Retrieve a single <c>Device</c>.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        public IEnumerable<Device> GetCollection(IEnumerable<Guid> ids)
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

            return new List<Device>();
        }

        /// <summary>
        /// Insert a single <c>Device</c> object.
        /// </summary>
        /// <param name="device"></param>
        public void Insert(Device device)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<DeviceDto>(DeviceDto.Translate(device));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Device</c> objects.
        /// </summary>
        /// <param name="devices"></param>
        public void Insert(IEnumerable<Device> devices)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<DeviceDto>(DeviceDto.Translate(devices.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>DeviceDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Device</c>. This will be translated to a <c>DeviceDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Device device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(DeviceDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>DeviceDto</c> object.
        /// </summary>
        /// <param name="device">A <c>Device</c>. This will be translated to a <c>DeviceDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Device device)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(DeviceDto.Translate(device));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
