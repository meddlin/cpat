using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    public class Target
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public List<string> Nicknames { get; set; }
        public List<string> PhoneNumbers { get; set; }
        public List<string> EmailAddresses { get; set; }
        public List<string> Organizations { get; set; }

        public List<Company> Employers { get; set; }
        public List<SocialLink> SocialLinks { get; set; }

        
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}