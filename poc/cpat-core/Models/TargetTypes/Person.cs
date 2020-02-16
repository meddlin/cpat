using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using System;
using System.Collections.Generic;

namespace cpat_core.Models
{
    /// <summary>
    /// A physical person.
    /// </summary>
    public class Person : AbstractTarget
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Person Translate(PersonDto data)
        {
            return new Person()
            {
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                LastName = data.LastName,
                //Nicknames = data.Nicknames,
                //PhoneNumbers = data.PhoneNumbers,
                //EmailAddresses = data.EmailAddresses,
                //Organizations = data.Organizations,
                //Employers = data.Employers,
                //SocialLinks = data.SocialLinks,

                //Relations = data.DocumentRelationJson,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }
    }
}