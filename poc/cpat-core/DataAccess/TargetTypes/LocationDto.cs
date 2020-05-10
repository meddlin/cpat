using cpat_core.Models;
using NPoco;
using System;
using System.Collections.Generic;

namespace cpat_core.DataAccess.TargetTypes
{
    [TableName("location")]
    [PrimaryKey("id")]
    public class LocationDto
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }
        [Column("latitude")] public string Latitude { get; set; }
        [Column("longitude")] public string Longitude { get; set; }

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [Column("documentrelation")] 
        [SerializedColumn]
        public List<DocumentRelation> DocumentRelation { get; set; } // translates to JSONB in database?

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }

        /// <summary>
        /// Converts a <c>Location</c> object to a <c>LocationDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static LocationDto Translate(Location data)
        {
            return new LocationDto()
            {
                //Id = Guid.NewGuid(),
                Name = data.Name,
                Latitude = data.Latitude,
                Longitude = data.Longitude,

                DocumentRelation = data.DocumentRelation,
                DateCreated = data.DateCreated != null ? data.DateCreated : DateTime.Now,
                UpdatedAt = data.UpdatedAt != null ? data.UpdatedAt : DateTime.Now
            };
        }

        /// <summary>
        /// Converts a collection of <c>Location</c> to a collection of <c>LocationDto</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<LocationDto> Translate(List<Location> data)
        {
            var dtoList = new List<LocationDto>();
            data.ForEach(d =>
            {
                dtoList.Add(LocationDto.Translate(d));
            });

            return dtoList;
        }
    }
}
