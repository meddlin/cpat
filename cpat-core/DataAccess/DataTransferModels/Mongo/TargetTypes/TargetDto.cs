using cpat_core.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes
{
    /// <summary>
    /// Data transfer model for a <c>Target</c> to be stored in MongoDB as a <c>TargetDto</c>.
    /// </summary>
    public class TargetDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }
        [BsonElement("region")] public string Region { get; set; }
        [BsonElement("collectionType")] public string CollectionType { get; set; }
        [BsonElement("selected")] public bool Selected { get; set; }

        [BsonElement("documentRelation")]
        public List<DocumentRelation> DocumentRelation { get; set; }

        [BsonElement("dateCreated")] public DateTime DateCreated { get; set; }
        [BsonElement("updatedAt")] public DateTime UpdatedAt { get; set; }

        [BsonElement("lastModifiedUserId")]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid LastModifiedByUserId { get; set; }
    }
}
