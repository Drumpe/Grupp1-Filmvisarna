using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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
        public UsersController(FilmvisarnaContext context) : base(context)
        {
        }

        [HttpPost("test")]
        public async Task<IActionResult> RegisterUser(User newUser)
        {

            if (await _context.users.FirstOrDefaultAsync(u => u.EmailAdress == newUser.EmailAdress) is not null)
                return BadRequest($"A user with the email address {newUser.EmailAdress} already exists in our system.");


            newUser.Password = HashPassword(newUser.Password);
            _context.users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
        }


        private string HashPassword(string password)
        {
            // convert password characters into binary according to UTF-8 encoding
            var bytes = Encoding.UTF8.GetBytes(password);
            // hashing algorithm that requires binary data
            var hashedBytes = SHA256.HashData(bytes);
            // resulting string: Base64-encoded representation of the SHA256 as a string
            return Convert.ToBase64String(hashedBytes);
        }
    }
}