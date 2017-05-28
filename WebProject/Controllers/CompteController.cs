using DataModel.Models;
using GenericImplementation.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpecificImplementation.Services.Interfaces;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{

    [Route("api/Compte")]
    public class CompteController : Controller
    {
        ICompteService _compteService;
        private readonly ILogger<CompteController> _logger;

        public CompteController(ICompteService compteService, ILogger<CompteController> logger)
        {
            _compteService = compteService;
            _logger = logger;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult GetAllComptes()
        {
            _logger.LogDebug("{method} called", nameof(GetAllComptes));
            IEnumerable<CompteViewModel> models = _compteService.GetAll();
            return Ok(models);
        }

        // GET: api/values
        [HttpGet("WrittingAccounts")]
        public IActionResult GetAllDefinedComptes()
        {
            _logger.LogDebug("{method} called", nameof(GetAllDefinedComptes));
            IEnumerable<CompteViewModel> models = _compteService.EcritureAccounts();
            return Ok(models);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetCompte(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetCompte));
            if (id == 0)
                return BadRequest();
            return Ok(_compteService.getAccount(id));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] CompteViewModel _compte)
        {
            _logger.LogDebug("{method} called", nameof(Post));
            if (_compte == null)
            {
                return BadRequest();
            }
            return Ok(_compteService.Create(_compte));
        }

        // PUT api/values/5
        [HttpPut()]
        public IActionResult Put([FromBody]CompteViewModel compte)
        {
            _logger.LogDebug("{method} called", nameof(Put));
            if ((compte == null) || (compte.IdCpt==0))
            {
                return BadRequest();
            }
            return Ok(_compteService.Update(compte));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] long id)
        {
            _logger.LogDebug("{method} called", nameof(Delete));
            if (id == 0)
                return BadRequest();
            if (!_compteService.Exist(compte => compte.CodeCpt == id))
                return NotFound();
            Compte _compte = _compteService.getAccount(id);
            _compteService.Delete(_compte);
            return NoContent();
        }
        [HttpGet("GetAccountsofLastLevel")]
        public IActionResult GetAccountsofLastLevel()
        {
            _logger.LogDebug("{method} called", nameof(GetAccountsofLastLevel));
            IEnumerable<CompteViewModel> _comptes = _compteService.GetAllAccountsOfLastLevel();

            return Ok(_comptes);
        }
        [HttpGet("GetPattern")]
        public IActionResult GetSpecificAccountsPattern(string model)
        {
            _logger.LogDebug("{method} called", nameof(GetSpecificAccountsPattern));
            if (model == null)
                return BadRequest();
            if (!_compteService.GetSpecificAccounts(model).GetEnumerator().MoveNext())
                return NotFound();
            return Ok(_compteService.GetSpecificAccounts(model));
        }
        [HttpGet("GetUserAccounts/{id}")]
        public IActionResult GetUserAccounts(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetCompte));
            if (id == 0)
                return BadRequest();
            if (!_compteService.GetUserAccounts(id).GetEnumerator().MoveNext())
                return NotFound();
            return Ok(_compteService.GetUserAccounts(id));
        }

        // POST api/values
        [HttpPost("createAccount")]
        public IActionResult PostCompte([FromBody] CompteViewModel _compte)
        {
            _logger.LogDebug("{method} called", nameof(PostCompte));
            if (_compte == null)
            {
                return BadRequest();
            }
            return Ok(_compteService.AddUserAccount(_compte));
        }
    }
}
