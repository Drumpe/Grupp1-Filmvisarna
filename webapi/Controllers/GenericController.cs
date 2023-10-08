using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<T> : ControllerBase where T : class, IEntity
    {
        public readonly FilmvisarnaContext _context;
        public GenericController(FilmvisarnaContext context)
        {
            _context = context;
        }

        // Get routes

        public async Task<T> GetRowByIdAsync(int id)
        {

            return await _context.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
        }
        [HttpGet]
        public async Task<ActionResult<List<T>>> GetAll()
        {
            try
            {
                var entities = await _context.Set<T>().ToListAsync();
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
        public async Task<ActionResult<List<T>>> GetById(int id)
        {
            try
            {
                var entity = await _context.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
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

        // Post route
        // TODO : Duplicate Entries. MySQL throws "Duplicate Entries" when setting Unique constraint. Easiest way to handle it.
        // Otherwise AnyAsync, but has its limits.
        [HttpPost()]
        public async Task<ActionResult<T>> Post(T entity)
        {
            try
            {
                _context.Set<T>().Add(entity);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        // Delete route 
        [HttpDelete("{id}")]
        public async Task<ActionResult<T>> DeleteById(int id)
        {
            var entity = await GetRowByIdAsync(id);
            _context.Remove(entity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException /* ex */)
            {
                // Log the error (uncomment ex variable name and write a log.
                return Conflict();
            }

            return NoContent();

        }

    }

}