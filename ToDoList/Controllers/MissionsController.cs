using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Adapters;
using ToDoList.Models.Entity;
using ToDoList.Models.Dto;
using ToDoList.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionsController : ControllerBase
    {

        private IUserService _userService;
        public MissionsController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<MissionsController>
        [HttpGet]
        public ActionResult<IEnumerable<Mission>> GetMissions()
        {
            // Get user
            string userId = HttpContext.Session.GetString(Constants.SessionKey.USER_ID);
            User user = _userService.GetOrCreateUserById(userId);

            return Ok(user.Missions);
        }

        // GET: api/<MissionsController>/all
        [Route("all")]
        [HttpGet]
        public ActionResult<IEnumerable<Mission>> GetMissionsOfAll()
        {
            // Get all missions
            string userId = HttpContext.Session.GetString(Constants.SessionKey.USER_ID);
            List<Mission> missions = _userService.GetAllMissons(userId);

            return Ok(missions);
        }

        // POST api/<MissionsController>
        [HttpPost]
        public ActionResult<Mission> Post([FromForm] MissionDTO payload)
        {
            Mission mission = MissionAdapter.FromMissionDTO(payload);
            // Get user
            string userId = HttpContext.Session.GetString(Constants.SessionKey.USER_ID);
            User user = _userService.GetOrCreateUserById(userId);

            user.Missions.Add(mission);
            return Created("GetMissions", mission);
        }

    }
}
