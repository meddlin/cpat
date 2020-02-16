using NPoco;
using System;

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
        [Column("documentrelation")] public string DocumentRelationJson { get; set; } // translates to JSONB in database?

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }
    }
}
