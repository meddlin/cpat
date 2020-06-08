using cpat_core.DataAccess.DataTransferModels.Cockroach.TargetTypes;
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
        private const string _TABLE_NAME_ = "device";

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
                    device = Device.Translate(
                        db.Fetch<DeviceDto>(new NPoco.Sql(
                            $@"
                                select * 
                                from {_TABLE_NAME_}
                                where id  = @0
                            ", id)).FirstOrDefault()
                    );
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
        /// Retrieve a lsit of <c>Device</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Device</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Device> GetPage(int page, int pageSize, DateTime minval)
        {
            var list = new List<Device>();
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    // NOTE: This hard-coding a minimum date value is a temporary fix. Later on, we
                    //      want to change this to some minimum value of the TIMESTAMP data type.
                    list = Device.Translate(
                        db.Fetch<DeviceDto>(new NPoco.Sql(
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
        /// Partial update for <c>DeviceDto</c> by only updating the specified columns.
        /// </summary>
        /// <param name="docId"></param>
        /// <param name="device"></param>
        /// <param name="ops">A <c>string</c> collection </param>
        /// <returns></returns>
        public int PartialUpdate(Guid docId, Device device, IEnumerable<string> ops)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(DeviceDto.Translate(device), docId, ops);
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
