using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using System;
using System.Collections.Generic;

namespace cpat_core.Models
{
    /// <summary>
    /// Meant to loosely represent any type of computing device:
    /// - Smaller than a datacenter
    /// - Someone/something could "own" it
    /// Cell phone, computer, laptop, tablet, server(?), camera, vehicle, etc.
    /// </summary>
    public class Device : AbstractTarget
    {
        public string Name { get; set; }
        public List<string> Organizations { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Device</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public static Device Translate(DeviceDto data)
        {
            return new Device()
            {
                Name = data.Name,
                //Organizations = data.Organizations,

                //Relations = data.DocumentRelationJson,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }
    }
}