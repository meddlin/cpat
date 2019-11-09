using NPoco;
using SignalRTest.DataAccess.Attributes;
using SignalRTest.DataAccess.Models.Attributes;
using System;
using System.Collections.Generic;

namespace SignalRTest.DataAccess.Models
{
    [TableName("people")]
    [PrimaryKey("id")]
    public class Person
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("firstname")] public string FirstName { get; set; }
        [Column("middlename")] public string MiddleName { get; set; }
        [Column("lastname")] public string LastName { get; set; }
        [Column("nicknames")] public IEnumerable<string> Nicknames { get; set; }
        [Column("phonenumbers")] public IEnumerable<PhoneNumber> PhoneNumbers { get; set; }
        [Column("emailaddresses")] public IEnumerable<string> EmailAddresses { get; set; }
        [Column("organizations")] public IEnumerable<string> Organizations { get; set; }
        [Column("employers")] public IEnumerable<string> Employers { get; set; }
        [Column("sociallinks")] public IEnumerable<SocialLink> SoclalLinks { get; set; }

        [Column("relations")] public IEnumerable<Relation> Relations { get; set; }
        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
