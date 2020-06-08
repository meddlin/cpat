using cpat_core.DataAccess.DataTransferModels.Cockroach.TargetTypes;
using cpat_core.Models.TargetTypes;
using cpat_core.Models.Utility;
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
        public List<Nickname> Nicknames { get; set; }
        public List<PhoneNumber> PhoneNumbers { get; set; }
        public List<EmailAddress> EmailAddresses { get; set; }
        public List<Organization> Organizations { get; set; }

        //public List<Company> Employers { get; set; }
        public List<Employer> Employers { get; set; }
        public List<SocialLink> SocialLinks { get; set; }
        

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Person</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public List<DocumentRelation> DocumentRelation { get; set; }

        /// <summary>
        /// Converts a <c>PersonDto</c> object to a <c>PersonDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Person Translate(PersonDto data)
        {
            return new Person()
            {
                Id = data.Id,
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                LastName = data.LastName,
                Nicknames = data.Nicknames,
                PhoneNumbers = data.PhoneNumbers,
                EmailAddresses = data.EmailAddresses,
                Organizations = data.Organizations,
                Employers = data.Employers,
                SocialLinks = data.SocialLinks,

                DocumentRelation = data.DocumentRelation,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }

        /// <summary>
        /// Converts a collection of <c>PersonDto</c> to a collection of <c>Person</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<Person> Translate(List<PersonDto> data)
        {
            var personList = new List<Person>();
            data.ForEach(d =>
            {
                personList.Add(Person.Translate(d));
            });

            return personList;
        }
    }
}