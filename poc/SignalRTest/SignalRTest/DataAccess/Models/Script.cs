using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.DataAccess.Models
{
    /// <summary>
    /// Scripts are metadata describing the individual "scripts" which can be executed
    /// via the attached "OSINT/Attack" API
    /// </summary>
    /// <remarks>
    /// OSINT/Attack API will initially be a Python API
    /// Metadata will be stored in Cockroach DB
    /// The actual files/scriptions will be stored on the filesystem
    /// </remarks>
    [TableName("scripts")]
    [PrimaryKey("id")]
    public class Script
    {
        [Column("id")] public Guid Id { get; set; }
        
        [Column("name")] public string Name { get; set; }
        [Column("toolname")] public string ToolName { get; set; }
        [Column("purpose")] public string Purpose { get; set; } // recon, exploit, attack, exfiltrate data, etc.

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
