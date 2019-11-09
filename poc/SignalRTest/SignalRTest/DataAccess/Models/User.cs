using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Models
{
    [TableName("Users")]
    [PrimaryKey("Id")]
    public class User
    {
        public Guid Id { get; set; }
        [Column("Username")] public string Username { get; set; }
        [Column("FirstName")] public string FirstName { get; set; }
        [Column("LastName")]  public string LastName { get; set; }

        [Column("DateCreated")] public DateTime DateCreated { get; set; }
        [Column("LastUpdated")] public DateTime LastUpdated { get; set; }
    }
}
