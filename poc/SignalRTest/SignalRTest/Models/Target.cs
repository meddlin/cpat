using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Models
{
    [TableName("targets")]
    [PrimaryKey("id")]
    public class Target
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }
        [Column("region")] public string Region { get; set; }
        [Column("collectiontype")] public string CollectionType { get; set; }

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
