using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers;
using webapi.Data;

namespace webapi.Entities
{
     [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        [HttpGet("SetSessionValue")]
        public IActionResult SetSessionValue()
        {
            // Check if the user role is not set in the session
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserRole")))
            {
                // Set the user role to "Guest"
                HttpContext.Session.SetString("UserRole", "Guest");
            }
            return Ok();
        }

        [HttpGet("getValue")]
        public IActionResult GetSessionValue()
        {
            // Get the user role from the session
            var userRole = HttpContext.Session.GetString("UserRole");

            return Ok($"Your user role is {userRole}. Login to become a Member!");
        }
    }

}