using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using cpat_core.Models.Utility;
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
        public List<Organization> Organizations { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Device</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public List<DocumentRelation> DocumentRelation { get; set; }

        /// <summary>
        /// Converts a <c>DeviceDto</c> object to a <c>Device</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Device Translate(DeviceDto data)
        {
            return new Device()
            {
                Id = data.Id,
                Name = data.Name,
                Organizations = data.Organizations,
                DocumentRelation = data.DocumentRelation,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }

        /// <summary>
        /// Converts a collection of <c>DeviceDto</c> to a collection of <c>Device</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<Device> Translate(List<DeviceDto> data)
        {
            var deviceList = new List<Device>();
            data.ForEach(d =>
            {
                deviceList.Add(Device.Translate(d));
            });

            return deviceList;
        }
    }
}