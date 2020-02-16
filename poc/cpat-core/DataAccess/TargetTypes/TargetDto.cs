using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.TargetTypes
{
    [TableName("target")]
    [PrimaryKey("id")]
    public class TargetDto
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }
        [Column("region")] public string Region { get; set; }
        [Column("collectiontype")] public string CollectionType { get; set; }
        
        [Column("selected")] public bool Selected { get; set; }

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [Column("documentrelation")] public string DocumentRelationJson { get; set; } // translates to JSONB in database?

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }
    }
}
