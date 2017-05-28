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
    }
}
