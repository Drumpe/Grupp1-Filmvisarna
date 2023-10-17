using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers.Utilities;
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<T>> DeleteById(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);
                if (entity == null)
                {
                    return NotFound();
                }
                _context.Remove(entity);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
        }
    }
}





