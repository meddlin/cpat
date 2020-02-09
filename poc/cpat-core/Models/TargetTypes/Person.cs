using System.Collections.Generic;
using cpat_core.Models.Utility;

namespace cpat_core.Models
{
    /// <summary>
    /// A physical person.
    /// </summary>
    public class Person
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

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Person</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}