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
        public async Task<List<T>> GetAllRowsFromTableAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<T> GetRowByIdAsync(int id)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
        }
        [HttpGet]
        public async Task<ActionResult<List<T>>> GetAll()
        {
            var entities = await GetAllRowsFromTableAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<T>>> GetById(int id)
        {
            var entity = await GetRowByIdAsync(id);
            return Ok(entity);
        }

        // Post route
        [HttpPost()]
        public async Task<ActionResult<T>> Post(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return Ok();
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