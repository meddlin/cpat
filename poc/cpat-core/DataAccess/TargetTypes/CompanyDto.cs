using cpat_core.Models;
using NPoco;
using System;
using System.Collections.Generic;

namespace cpat_core.DataAccess.TargetTypes
{
    [TableName("company")]
    [PrimaryKey("id")]
    public class CompanyDto
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [Column("documentrelation")] public List<DocumentRelation> DocumentRelation { get; set; } // translates to JSONB in database?

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }

        /// <summary>
        /// Converts a <c>Company</c> object to a <c>CompanyDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static CompanyDto Translate(Company data)
        {
            return new CompanyDto()
            {
                Id = Guid.NewGuid(),
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