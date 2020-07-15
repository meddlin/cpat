using NPoco;
using System;

namespace PocoCrdb.DataAccess
{
    [TableName("accounts")]
    [PrimaryKey("id")]
    public class Account
    {
        [Column("id")] public Guid Id { get; set; }

        [Column("accountowner")] public string AccountOwner { get; set; }
        [Column("balance")] public decimal Balance { get; set; }

        [Column("datecreated")] public DateTime DateCreated { get; set; }
        [Column("lastupdated")] public DateTime LastUpdated { get; set; }
    }
}
