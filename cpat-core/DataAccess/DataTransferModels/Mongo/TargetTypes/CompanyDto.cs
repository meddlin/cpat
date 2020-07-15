using cpat_core.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes
{
    public class CompanyDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("name")] public string Name { get; set; }

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [BsonElement("documentrelation")]
        public List<DocumentRelation> DocumentRelation { get; set; } // translates to JSONB in database?

        [BsonElement("datecreated")] public DateTime DateCreated { get; set; }
        [BsonElement("updatedat")] public DateTime UpdatedAt { get; set; }

        [BsonElement("lastModifiedUserId")]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid LastModifiedByUserId { get; set; }

        /// <summary>
        /// Converts a <c>Company</c> object to a <c>CompanyDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static CompanyDto Translate(Company data)
        {
            return new CompanyDto()
            {
                Name = data.Name,
                DocumentRelation = data.DocumentRelation,
                DateCreated = data.DateCreated != null ? data.DateCreated : DateTime.Now,
                UpdatedAt = data.UpdatedAt != null ? data.UpdatedAt : DateTime.Now
            };
        }

        /// <summary>
        /// Converts a collection of <c>Company</c> to a collection of <c>CompanyDto</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<CompanyDto> Translate(List<Company> data)
        {
            var dtoList = new List<CompanyDto>();
            data.ForEach(d =>
            {
                dtoList.Add(CompanyDto.Translate(d));
            });

            return dtoList;
        }
    }
}
