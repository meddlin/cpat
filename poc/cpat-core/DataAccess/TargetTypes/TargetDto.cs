using cpat_core.Models;
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
        [Column("documentrelation")]
        [SerializedColumn] // translates to JSONB in database
        public List<DocumentRelation> DocumentRelation { get; set; }

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }

        /// <summary>
        /// Converts a <c>Target</c> object to a <c>TargetDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static TargetDto Translate(Target data)
        {
            var sampleId = Guid.NewGuid();

            var sampleData = new TargetDto()
            {
                Name = data.Name,
                Region = data.Region,
                CollectionType = data.CollectionType,
                Selected = data.Selected,

                DocumentRelation = data.Relations,

                DateCreated = data.DateCreated != null ? data.DateCreated : DateTime.Now,
                UpdatedAt = data.UpdatedAt != null ? data.UpdatedAt : DateTime.Now,
                LastModifiedByUserId = sampleId
            };

            return sampleData;

            //return new TargetDto()
            //{
            //    Id = sampleId,
            //    Name = data.Name,
            //    Region = data.Region,
            //    CollectionType = data.CollectionType,
            //    Selected = data.Selected,

            //    //DocumentRelationJson = data.Relations,
            //    DocumentRelationJson = "empty",

            //    DateCreated = data.DateCreated != null ? data.DateCreated : DateTime.Now,
            //    UpdatedAt = data.UpdatedAt != null ? data.UpdatedAt : DateTime.Now,
            //    LastModifiedByUserId = Guid.NewGuid()
            //};
        }

        /// <summary>
        /// Converts a collection of <c>Target</c> to a collection of <c>TargetDto</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<TargetDto> Translate(List<Target> data)
        {
            var dtoList = new List<TargetDto>();
            data.ForEach(d =>
            {
                dtoList.Add(TargetDto.Translate(d));
            });

            return dtoList;
        }
    }
}
