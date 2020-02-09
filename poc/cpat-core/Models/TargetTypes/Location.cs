using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    /// <summary>
    /// Physical, literal place. Able to locate it on a map.
    /// </summary>
    public class Location
    {
        public string Name { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        
        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Location</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User LastModifiedBy { get; set; }
    }
}