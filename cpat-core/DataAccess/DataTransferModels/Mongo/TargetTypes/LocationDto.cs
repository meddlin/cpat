using cpat_core.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes
{
    public class LocationDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        [BsonElement("latitude")] public string Latitude { get; set; }
        [BsonElement("longitude")] public string Longitude { get; set; }

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [BsonElement("documentRelation")]
        public List<DocumentRelation> DocumentRelation { get; set; } // translates to JSONB in database?

        [BsonElement("dateCreated")] public DateTime DateCreated { get; set; }
        [BsonElement("updatedAt")] public DateTime UpdatedAt { get; set; }
        [BsonElement("lastModifiedUserId")] public Guid LastModifiedByUserId { get; set; }

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
