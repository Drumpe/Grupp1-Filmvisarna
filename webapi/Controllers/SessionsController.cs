using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers;
using webapi.Controllers.Utilities;
using webapi.Data;

namespace webapi.Entities
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        [HttpGet("setuserrole")]
        public IActionResult SetSessionValue()
        {
            // Check if the user role is not set in the session
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserRole")))
            {
                // Set the user role to "Guest"
                HttpContext.Session.SetString("UserRole", Role.guest.ToString());
            }
            return Ok();
        }

        [HttpGet("getuserrole")]
        public IActionResult GetSessionValue()
        {
            // Get the user role from the session
            var userRole = HttpContext.Session.GetString("UserRole");
            var email = HttpContext.Session.GetString("Email");
            var name = HttpContext.Session.GetString("Name");

            return Ok(userRole);
        }
    }

}