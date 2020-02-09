using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    /// <summary>
    /// Meant to loosely represent any type of computing device:
    /// - Smaller than a datacenter
    /// - Someone/something could "own" it
    /// Cell phone, computer, laptop, tablet, server(?), camera, vehicle, etc.
    /// </summary>
    public class Device
    {
        public string Name { get; set; }
        public List<string> Organizations { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Device</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>        
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User LastModifiedBy { get; set; }
    }
}