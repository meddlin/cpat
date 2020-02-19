using cpat_core.DataAccess.TargetTypes;
using cpat_core.Models.TargetTypes;
using System;
using System.Collections.Generic;

namespace cpat_core.Models
{
    public class Company : AbstractTarget
    {
        public string Name { get; set; }

        /// <summary>
        /// A list of <c>DocumentRelation</c> objects connecting one <c>Company</c> to
        /// n-number of other pieces of information.
        /// </summary>
        /// <value></value>
        public IEnumerable<DocumentRelation> Relations { get; set; }

        /// <summary>
        /// Converts a <c>CompanyDto</c> object to a <c>Company</c> object.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Company Translate(CompanyDto data)
        {
            return new Company()
            {
                Name = data.Name,

                //Relations = data.DocumentRelationJson,

                DateCreated = data.DateCreated,
                UpdatedAt = data.UpdatedAt,
                //LastModifiedBy = data.LastModifiedByUserId
            };
        }

        /// <summary>
        /// Converts a collection of <c>CompanyDto</c> to a collection of <c>Company</c>.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static IEnumerable<Company> Translate(List<CompanyDto> data)
        {
            var compList = new List<Company>();
            data.ForEach(d =>
            {
                compList.Add(Company.Translate(d));
            });

            return compList;
        }
    }
}