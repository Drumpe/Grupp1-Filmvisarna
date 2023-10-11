using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : GenericController<User>
    {
        [HttpGet("CheckEmail")]
        public async Task<IActionResult> CheckEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _context.Set<User>().SingleOrDefaultAsync(u => u.EmailAdress == email);

            if (user != null)
            {
                return Ok(false);  // Email is already taken
            }

            return Ok(true);  // Email is available
        }

    }
}