using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using cpat_core.Models;
using cpat_core.DataAccess.DataControl;

namespace cpat_core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;

        public DeviceController(ILogger<DeviceController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retrieve a default collection of <c>Device</c>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Device> Get()
        {
            // var q = new DeviceQuery();
            // q.GetSingle(id);

            return new List<Device>() { 
                new Device() { Name = "Phone" }, 
                new Device() { Name = "PC" } 
            };
        }

        /// <summary>
        /// Insert a single <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void Insert([FromBody] Device data)
        {
            var q = new DeviceQuery();
            q.Insert(data);
        }

        /// <summary>
        /// Insert a collection of <c>Device</c> records.
        /// </summary>
        /// <param name="data"></param>
        [HttpPost]
        public void InsertList([FromBody] List<Device> data)
        {
            var q = new DeviceQuery();
            q.Insert(data);
        }

        /// <summary>
        /// Update a <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Update([FromBody] Device data)
        {
            var q = new DeviceQuery();
            return q.Update(data);
        }

        /// <summary>
        /// Remove a <c>Device</c> record.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public int Remove([FromBody] Device data)
        {
            var q = new DeviceQuery();
            return q.Remove(data);
        }
    }
}