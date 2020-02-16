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

        [Column("nicknames")] public string Nicknames { get; set; } // translates to JSONB in database?
        [Column("phonenumbers")] public string PhoneNumbers { get; set; } // translates to JSONB in database?
        [Column("emailaddresses")] public string EmailAddresses { get; set; } // translates to JSONB in database?
        [Column("organizations")] public string Organizations { get; set; } // translates to JSONB in database?

        [Column("employers")] public string Employers { get; set; } // translates to JSONB in database? (JSON of other objects)
        [Column("sociallinks")] public string SocialLinks { get; set; } // translates to JSONB in database? (JSON of other objects)

        /// <summary>
        /// An attempt at using JSONB for the <c>DocumentRelation</c> structure for each document
        /// </summary>
        [Column("documentrelation")] public string DocumentRelationJson { get; set; } // translates to JSONB in database?

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("updatedat")] public DateTime UpdatedAt { get; set; }
        [Column("lastmodifiedbyuserid")] public Guid LastModifiedByUserId { get; set; }
    }
}
