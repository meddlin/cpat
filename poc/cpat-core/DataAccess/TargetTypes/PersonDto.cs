using cpat_core.Models;
using cpat_core.Models.Utility;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.TargetTypes
{
    [TableName("person")]
    [PrimaryKey("id")]
    public class PersonDto
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("firstname")] public string FirstName { get; set; }
        [Column("middlename")] public string MiddleName { get; set; }
        [Column("lastname")] public string LastName { get; set; }

        [SerializedColumn]
        [Column("nicknames")] 
        public List<Nickname> Nicknames { get; set; } // translates to JSONB in database?
        
        [SerializedColumn]
        [Column("phonenumbers")] 
        public List<PhoneNumber> PhoneNumbers { get; set; } // translates to JSONB in database?
        
        [SerializedColumn]
        [Column("emailaddresses")] 
        public List<EmailAddress> EmailAddresses { get; set; } // translates to JSONB in database?

        [SerializedColumn]
        [Column("organizations")] 
        public List<Organization> Organizations { get; set; } // translates to JSONB in database?

        [SerializedColumn]
        [Column("employers")] 
        public List<Employer> Employers { get; set; } // translates to JSONB in database? (JSON of other objects)
        
        [SerializedColumn]
        [Column("sociallinks")] 
        public List<SocialLink> SocialLinks { get; set; } // translates to JSONB in database? (JSON of other objects)

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [Column("documentrelation")]
        [SerializedColumn]
        public List<DocumentRelation> DocumentRelation { get; set; }

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }

        /// <summary>
        /// Converts a <c>Person</c> object to a <c>PersonDto</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PersonDto Translate(Person data)
        {
            var sampleData = new PersonDto()
            {
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                LastName = data.LastName,
                Nicknames = data.Nicknames,
                PhoneNumbers = data.PhoneNumbers,
                EmailAddresses = data.EmailAddresses,
                Organizations = data.Organizations,
                Employers = data.Employers,
                SocialLinks = data.SocialLinks,

                DocumentRelation = data.Relations,
                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt
            };

            return sampleData;
        }

        /// <summary>
        /// Converts a collection of <c>Person</c> to a collection of <c>PersonDto</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<PersonDto> Translate(List<Person> data)
        {
            var dtoList = new List<PersonDto>();
            data.ForEach(d =>
            {
                dtoList.Add(PersonDto.Translate(d));
            });

            return dtoList;
        }
    }
}
