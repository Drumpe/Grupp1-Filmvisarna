using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Entities;
using webapi.Controllers.Utilities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly FilmvisarnaContext _context;
        public UsersController(FilmvisarnaContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var entities = await _context.users.ToListAsync();
                if (entities == null || !entities.Any())
                {
                    return NotFound();
                }

                return Ok(entities);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var entity = await _context.users.SingleOrDefaultAsync(e => e.Id == id);

                if (entity == null)
                {
                    return NotFound();
                }
                return Ok(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> RegisterUser(User newUser)
        {

            if (await _context.users.FirstOrDefaultAsync(u => u.EmailAdress == newUser.EmailAdress) is not null)
                return BadRequest($"A user with the email address {newUser.EmailAdress} already exists in our system.");

            newUser.Password = PasswordEncryptor.HashPassword(newUser.Password);
            _context.users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
        }



    }
}