using System.Collections.Generic;

namespace cpat_core.Models 
{
    /// <summary>
    /// A user profile of the CPAT software.
    /// </summary>
    public class User 
    {
        public string Username { get; set; }

        public string FirstName { get; set; }
        public string LastName { get;set; }
        public string FullName {
            get {
                return $"{FirstName} {LastName}";
            }
        }


        public DateTime DateCreated { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User LastModifiedBy { get; set; }
    }
}