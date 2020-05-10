using cpat_core.Models;
using cpat_core.Models.Utility;
using NPoco;
using System;
using System.Collections.Generic;

namespace cpat_core.DataAccess.TargetTypes
{
    [TableName("device")]
    [PrimaryKey("id")]
    public class DeviceDto
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }

        [Column("organizations")] 
        [SerializedColumn]
        public List<Organization> Organizations { get; set; } // translates to JSONB in database?

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
        /// Converts a <c>Device</c> object to a <c>DeviceDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DeviceDto Translate(Device data)
        {
            return new DeviceDto()
            {
                Name = data.Name,
                Organizations = data.Organizations,
                DocumentRelation = data.DocumentRelation,
                DateCreated = data.DateCreated != null ? data.DateCreated : DateTime.Now,
                UpdatedAt = data.UpdatedAt != null ? data.UpdatedAt : DateTime.Now
            };
        }

        /// <summary>
        /// Converts a collection of <c>Device</c> to a collection of <c>DeviceDto</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<DeviceDto> Translate(List<Device> data)
        {
            var dtoList = new List<DeviceDto>();
            data.ForEach(d =>
            {
                dtoList.Add(DeviceDto.Translate(d));
            });

            return dtoList;
        }
    }
}
