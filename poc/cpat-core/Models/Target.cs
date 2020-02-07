using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    public class Target
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string CollectionType { get; set; }
        public string DocumentId { get; set; }
        public bool Selected { get; set; }

        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}