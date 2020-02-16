using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using System;
using System.Collections.Generic;

namespace cpat_core.Models
{
    /// <summary>
    /// A <c>Target</c> is the main object model which a scan can be derived on. A <c>Target</c>
    /// can be of any type, and a scan may contain a tree of "target types". However, there can
    /// only be one main <c>Target</c> of any scan.
    /// </summary>
    public class Target : AbstractTarget
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string CollectionType { get; set; }
        
        // Do we need this?
        // If we're tracking the Guid in the DTO object, and we have full realtion structure in another field...
        // ...then do we really need this 'Id' field?
        //public string DocumentId { get; set; }

        public bool Selected { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Target</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }


        /// <summary>
        /// Translates <c>TargetDto</c> object to <c>Target</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Target Translate(TargetDto data)
        {
            return new Target()
            {
                Id = data.Id,
                Name = data.Name,
                Region = data.Region,
                CollectionType = data.CollectionType,
                Selected = data.Selected,
                //Relations = data.DocumentRelationJson,
                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }
    }
}