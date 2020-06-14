using cpat_core.Models;
using cpat_core.Models.Utility;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes
{
    public class DeviceDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }

        [BsonElement("organizations")]
        public List<Organization> Organizations { get; set; } // translates to JSONB in database?

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [BsonElement("documentrelation")]
        public List<DocumentRelation> DocumentRelation { get; set; } // translates to JSONB in database?

        [BsonElement("dateCreated")] public DateTime DateCreated { get; set; }
        [BsonElement("updatedAt")] public DateTime UpdatedAt { get; set; }

        [BsonElement("lastModifiedUserId")]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid LastModifiedByUserId { get; set; }
    }
}
