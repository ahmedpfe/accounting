using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GenericImplementation.Services.Interfaces;
using DataModel.Models;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SpecificImplementation.Services.Classes;
using SpecificImplementation.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{
    [Route("api/Journal")]
    public class JournalController : Controller
    {
        IJournalService _journalService;
        private readonly ILogger<JournalController> _logger;

        public JournalController(IJournalService journalService, ILogger<JournalController> logger)
        {
            this._journalService = journalService;
            this._logger = logger;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult GetAllSheet()
        {
            _logger.LogDebug("{method} called", nameof(GetAllSheet));
            IEnumerable<JournalViewModel> models = _journalService.GetAll();
            return Ok(models);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetSheet(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetSheet));
            if (id == 0)
                return BadRequest();
            return Ok(_journalService.FindBy(journal=>journal.CodeJournal==id));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] JournalViewModel _journal)
        {
            _logger.LogDebug("{method} called", nameof(Post));
            if (_journal == null)
            {
                return BadRequest();
            }
            return Ok(_journalService.Create(_journal));
        }

        // PUT api/values/5
        [HttpPut()]
        public IActionResult Put([FromBody]JournalViewModel journal)
        {
            _logger.LogDebug("{method} called", nameof(Put));
            if (journal == null)
            {
                return BadRequest();
            }
            return Ok(_journalService.Update(journal));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] long id)
        {
            _logger.LogDebug("{method} called", nameof(Delete));
            if (id == 0)
                return BadRequest();
            Journal _journal = _journalService.FindEntity(Journal => Journal.CodeJournal == id);            
            if (_journal==null) 
                return NotFound();
            if (_journalService.getScripturesNumber(id) != 0)
                return Unauthorized();         
            _journalService.Delete(_journal);
            return NoContent();
        }
    }
}
