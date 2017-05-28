using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataModel.Models;
using GenericImplementation.Services.Interfaces;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{
    [Route("api/Exercice")]
    public class ExerciceComptableController : Controller
    {
        IEntityService<ExerciceComptable, ExerciceComptableViewModel> _exerciceCompta;
        private readonly ILogger<ExerciceComptableController> _logger;
        public ExerciceComptableController(IEntityService<ExerciceComptable, ExerciceComptableViewModel> exerciceCompta, ILogger<ExerciceComptableController> logger)
        {
            _exerciceCompta = exerciceCompta;
            _logger = logger;
        }
        [HttpGet]
        public IActionResult GetAllExercices()
        {
            _logger.LogDebug("{method} called", nameof(GetAllExercices));
            IEnumerable<ExerciceComptableViewModel> models = _exerciceCompta.GetAll();
            return Ok(models);
        }
        [HttpGet("{id}")]
        public IActionResult GetExercice(long id)
        {
            _logger.LogDebug("{method} called", nameof(GetExercice));
            if (id == 0)
                return BadRequest();
            ExerciceComptableViewModel _exercice = _exerciceCompta.FindBy(exercice => exercice.IdExercice == id).FirstOrDefault();
            if (_exercice == null)
                return NotFound();
            return Ok(_exercice);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] ExerciceComptableViewModel _exercice)
        {
            _logger.LogDebug("{method} called", nameof(Post));
            if (_exercice == null)
            {
                return BadRequest();
            }
            return Ok(_exerciceCompta.Create(_exercice));
        }

        // PUT api/values/5
        [HttpPut()]
        public IActionResult Put([FromBody]ExerciceComptableViewModel _exercice)
        {
            _logger.LogDebug("{method} called", nameof(Put));
            if (_exercice == null)
            {
                return BadRequest();
            }
            return Ok(_exerciceCompta.Update(_exercice));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] long id)
        {
            _logger.LogDebug("{method} called", nameof(Delete));
            if (id == 0)
                return BadRequest();
            ExerciceComptable _exercice = _exerciceCompta.GetWithDetails(exercice => exercice.IdExercice == id,exercice=>exercice.OperationComptable);
            if (_exercice.OperationComptable.Count() != 0)
                return Unauthorized();
            _exerciceCompta.Delete(_exercice);
            return NoContent();
        }
        [HttpGet("CurrentExercice")]
        public IActionResult GetCurrentExercice()
        {
            _logger.LogDebug("{method} called", nameof(GetCurrentExercice));            
            ExerciceComptableViewModel _exercice = _exerciceCompta.FindBy(exercice => exercice.StatusExercice.Equals("Ongoing")).FirstOrDefault();
            if (_exercice == null)
                return NotFound();
            return Ok(_exercice);
        }


    }
}
