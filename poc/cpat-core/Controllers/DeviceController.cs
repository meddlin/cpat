using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        public IEnumerable<DeviceController> Get()
        {
            return new List<Device>()
            {
                new Device() { Name = "Phone" },
                new Device() { Name = "PC" },
            };
        }
    }
}