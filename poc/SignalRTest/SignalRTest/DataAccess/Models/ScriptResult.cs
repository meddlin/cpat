using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.DataAccess.Models
{
    /// <summary>
    /// 
    /// </summary>
    [TableName("scriptresults")]
    [PrimaryKey("id")]
    public class ScriptResult
    {
        [Column("id")] public Guid Id { get; set; }

        /// <summary>
        /// Raw data returned from the tool.
        /// </summary>
        /// <remarks>
        /// For now, serialized to a <c>string</c> until we determine a better way to store it
        /// </remarks>
        [Column("raw")] public string Raw { get; set; }

        /// <summary>
        /// The analyzed/refined version of the raw data returned from executing the <c>Script</c>.
        /// </summary>
        [Column("analyzed")] public string Analyzed { get; set; }

        [Column("relations")] public IEnumerable<Relation> Relations { get; set; }
        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
