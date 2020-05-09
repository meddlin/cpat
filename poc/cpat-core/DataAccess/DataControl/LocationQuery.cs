using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models;
using cpat_core.Models.Utility;
using Microsoft.AspNetCore.Mvc;
using Morcatko.AspNetCore.JsonMergePatch;
using Npgsql;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataControl
{
    public class LocationQuery
    {
        public Database dbAccess;
        private const string _TABLE_NAME_ = "location";

        public LocationQuery()
        {
            dbAccess = new DataAccess.Database();
        }

        /// <summary>
        /// Retrieve a single <c>Location</c>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Location GetSingle(Guid id)
        {
            Location location;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    location = Location.Translate(
                        db.Fetch<LocationDto>(new Sql(
                        $@"
                            select *
                            from {_TABLE_NAME_}
                            where id  = @0
                        ", id)).FirstOrDefault()
                    );
                    db.Connection.Close();
                }
            }

            return location;
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
        /// Retrieve a lsit of <c>Location</c> one page at a time. Change the value of page and pageSize to alter the amount of
        /// <c>Location</c> returned on each query.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="minval"></param>
        /// <returns></returns>
        public IEnumerable<Location> GetPage(int page, int pageSize, DateTime minval)
        {
            var list = new List<Location>();
            minval = minval == null ? new DateTime(year: 2000, month: 0, day: 0) : minval;

            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();

                    // NOTE: This hard-coding a minimum date value is a temporary fix. Later on, we
                    //      want to change this to some minimum value of the TIMESTAMP data type.
                    list = Location.Translate(
                        db.Fetch<LocationDto>(new NPoco.Sql(
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
        /// Insert a single <c>Location</c> object.
        /// </summary>
        /// <param name="location"></param>
        public void Insert(Location location)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.Save<LocationDto>(LocationDto.Translate(location));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Batch inserts a collection of <c>Location</c> objects.
        /// </summary>
        /// <param name="locations"></param>
        public void Insert(IEnumerable<Location> locations)
        {
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    db.InsertBatch<LocationDto>(LocationDto.Translate(locations.ToList()));
                    db.Connection.Close();
                }
            }
        }

        /// <summary>
        /// Update a <c>LocationDto</c> object.
        /// </summary>
        /// <param name="location">A <c>Location</c>. This will be translated to a <c>LocationDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Update(Location location)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(LocationDto.Translate(location));
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Partial updates for <c>LocationDto</c> by only updating the specified columns.
        /// </summary>
        /// <param name="docId"></param>
        /// <param name="data"></param>
        /// <param name="ops"></param>
        /// <returns></returns>
        internal int PartialUpdate(Guid docId, Location data, IEnumerable<string> ops)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Update(LocationDto.Translate(data), docId, ops);
                    db.Connection.Close();
                }
            }

            return res;
        }

        /// <summary>
        /// Deletes a <c>LocationDto</c> object.
        /// </summary>
        /// <param name="location">A <c>Location</c>. This will be translated to a <c>LocationDto</c> before the update operation.</param>
        /// <returns><c>int</c> denoting the success value of the operation.</returns>
        public int Remove(Location location)
        {
            int res;
            using (var conn = new NpgsqlConnection(dbAccess.connectionString))
            {
                using (var db = new NPoco.Database(conn))
                {
                    db.Connection.Open();
                    res = db.Delete(LocationDto.Translate(location));
                    db.Connection.Close();
                }
            }

            return res;
        }
    }
}
