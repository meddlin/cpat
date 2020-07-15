using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpat_core.Models.TargetTypes
{
    public abstract class AbstractTarget
    {
        public Guid Id { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User LastModifiedBy { get; set; }
    }
}
