using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using System;
using System.Collections.Generic;

namespace cpat_core.Models
{
    /// <summary>
    /// Physical, literal place. Able to locate it on a map.
    /// </summary>
    public class Location : AbstractTarget
    {
        public string Name { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        
        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Location</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public List<DocumentRelation> DocumentRelation { get; set; }

        /// <summary>
        /// Converts a <c>LocationDto</c> object to a <c>Location</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Location Translate(LocationDto data)
        {
            return new Location()
            {
                Id = data.Id,
                Name = data.Name,
                Latitude = data.Latitude,
                Longitude = data.Longitude,

                DocumentRelation = data.DocumentRelation,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }

        /// <summary>
        /// Converts a collection of <c>LocationDto</c> to a collection of <c>Location</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<Location> Translate(List<LocationDto> data)
        {
            var locationList = new List<Location>();
            data.ForEach(d =>
            {
                locationList.Add(Location.Translate(d));
            });

            return locationList;
        }
    }
}