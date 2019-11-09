using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.DataAccess.Models
{
    [TableName("locations")]
    [PrimaryKey("id")]
    public class Location
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("name")] public string Name { get; set; }
        [Column("latitude")] public string Latitude { get; set; }
        [Column("longitude")] public string Longitude { get; set; }

        [Column("relations")] public IEnumerable<Relation> Relations { get; set; }
        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
