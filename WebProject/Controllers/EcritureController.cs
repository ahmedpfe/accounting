using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpecificImplementation.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{
    [Route("api/Ecriture")]
    public class EcritureController : Controller
    {
        IEcritureService _ecritureService;
        private readonly ILogger<EcritureController> _logger;
        public EcritureController(IEcritureService ecritureService, ILogger<EcritureController> logger)
        {
            this._ecritureService = ecritureService;
            this._logger = logger;
        }
        [HttpGet("numEcriture/{id}")]
        public IActionResult GetnumEcriture(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetnumEcriture));
            return Ok(_ecritureService.numEcritureGenere(id));
        }
    }
}
