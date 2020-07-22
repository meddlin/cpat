using cpat_core.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace cpat_core.DataAccess.DataTransferModels.Mongo
{
    /// <summary>
    /// Data transfer model for a <c>OsintData</c> to be stored in MongoDB as a <c>OsintDto</c>.
    /// </summary>
    public class OsintDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("toolName")] public string ToolName { get; set; }
        [BsonElement("rawData")] public string RawData { get; set; }

        [BsonElement("dateCreated")] public DateTime DateCreated { get; set; }
    }
}