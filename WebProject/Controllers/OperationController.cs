using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpecificImplementation.Services.Interfaces;
using Microsoft.Extensions.Logging;
using DataModel.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{
    [Route("api/Operation")]
    public class OperationController : Controller
    {
        IOperationService _operationService;
        private readonly ILogger<OperationController> _logger;

        public OperationController(IOperationService operationService, ILogger<OperationController> logger)
        {
            this._operationService = operationService;
            this._logger = logger;
        }
        [HttpGet("pj")]
        public IActionResult GetNPJ()
        {
            _logger.LogDebug("{method} called", nameof(GetNPJ));           
            return Ok(_operationService.seqId());
        }
   

        [HttpPost]
        public IActionResult Post([FromBody] OperationComptableViewModel _operation)
        {
            _logger.LogDebug("{method} called", nameof(Post));
            if (_operation == null)
            {
                return BadRequest();
            }
            return Ok(_operationService.Create(_operation));
        }

        // PUT api/values/5
        [HttpPut()]
        public IActionResult Put([FromBody]OperationComptableViewModel operation)
        {
            _logger.LogDebug("{method} called", nameof(Put));
            if (operation == null)
            {
                return BadRequest();
            }
            return Ok(_operationService.Update(operation));
        }
        [HttpGet("Rq/{begin}/{end}")]
        public IActionResult GetRequestOperations(string begin, string end)
        {
            if (begin == null || end == null)
            {
                return BadRequest();
            }
            DateTime startDate = DateTime.ParseExact(begin, "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
            DateTime endDate = DateTime.ParseExact(end, "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
            _logger.LogDebug("{method} called", nameof(GetRequestOperations));
            return Ok(_operationService.GetRequestedOperation(startDate, endDate));
        }
        [HttpGet("RqAll/{begin}/{end}")]
        public IActionResult GetRequestOperationsWithDetails(string begin, string end)
        {
            if (begin == null || end == null)
            {
                return BadRequest();
            }
            DateTime startDate = DateTime.ParseExact(begin, "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
            DateTime endDate = DateTime.ParseExact(end, "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
            _logger.LogDebug("{method} called", nameof(GetRequestOperationsWithDetails));
            return Ok(_operationService.GetRequestedOperationWithDetails(startDate, endDate));
        }
    }
}
