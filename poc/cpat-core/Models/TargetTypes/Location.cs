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
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public static Location Translate(LocationDto data)
        {
            return new Location()
            {
                Name = data.Name,
                Latitude = data.Latitude,
                Longitude = data.Longitude,

                //Relations = data.DocumentRelationJson,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }
    }
}