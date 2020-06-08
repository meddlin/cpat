using cpat_core.DataAccess.DataTransferModels.Cockroach.TargetTypes;
using cpat_core.Models;
using Xunit;

namespace CpatCoreTests
{
    public class TargetTests
    {
        /// <summary>
        /// Verifies a <c>TargetDto</c> can be correctly translated into a <c>Target</c>.
        /// </summary>
        [Fact]
        public void Translate__TargetDto__ValidTarget()
        {
            var dto = new TargetDto();
            var translated = Target.Translate(dto);

            Assert.IsType<Target>(translated);
        }
    }
}
