using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    /// <summary>
    /// A <c>Target</c> is the main object model which a scan can be derived on. A <c>Target</c>
    /// can be of any type, and a scan may contain a tree of "target types". However, there can
    /// only be one main <c>Target</c> of any scan.
    /// </summary>
    public class Target
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string CollectionType { get; set; }
        public string DocumentId { get; set; }
        public bool Selected { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Target</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}