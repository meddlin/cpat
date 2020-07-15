using cpat_core.Models;
using cpat_core.Models.Utility;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.DataAccess.DataTransferModels.Mongo.TargetTypes
{
    /// <summary>
    /// Data transfer model for a <c>Target</c> to be stored in MongoDB as a <c>TargetDto</c>.
    /// </summary>
    public class PersonDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("firstName")] public string FirstName { get; set; }

        [BsonElement("middleName")] public string MiddleName { get; set; }

        [BsonElement("lastName")] public string LastName { get; set; }

        [BsonElement("nickNames")] public List<Nickname> Nicknames { get; set; }

        [BsonElement("phoneNumbers")] public List<PhoneNumber> PhoneNumbers { get; set; }

        [BsonElement("emailAddresses")] public List<EmailAddress> EmailAddresses { get; set; }

        [BsonElement("organizations")] public List<Organization> Organizations { get; set; }

        [BsonElement("employers")] public List<Employer> Employers { get; set; }

        [BsonElement("socialLinks")] public List<SocialLink> SocialLinks { get; set; }


        [BsonElement("documentRelation")] public List<DocumentRelation> DocumentRelation { get; set; }

        [BsonElement("dateCreated")] public DateTime DateCreated { get; set; }

        [BsonElement("updatedAt")] public DateTime UpdatedAt { get; set; }
        
        [BsonElement("lastModifiedUserId")]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public Guid LastModifiedByUserId { get; set; }

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

                DocumentRelation = data.DocumentRelation,
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
