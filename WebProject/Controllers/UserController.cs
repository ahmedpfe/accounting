using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataModel.Models;
using GenericImplementation.Services.Classes;
using Microsoft.Extensions.Logging;
using GenericImplementation.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebProject.Controllers
{
    [Route("api/User")]
    public class UserController : Controller
    {
        IEntityService<User,UserViewModel> _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(IEntityService<User, UserViewModel> userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }
        [HttpGet()]
        public IActionResult GetCurrentUser()
        {
            _logger.LogDebug("{method} called", nameof(GetCurrentUser));
            return Ok(_userService.GetAll().FirstOrDefault());
        }
    }
}
