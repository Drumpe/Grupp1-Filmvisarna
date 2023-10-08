using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{

    /// <summary>
    /// A generic controller for performing basic CRUD operations (no joins) on entities of type T.
    /// </summary>
    /// <typeparam name="T">The entity type.</typeparam>
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<T> : ControllerBase where T : class, IEntity
    {
        public readonly FilmvisarnaContext _context;

        /// <summary>
        /// Initializes a new instance of the CrudController class with a database context.
        /// </summary>
        /// <param name="context">The database context.</param>
        public GenericController(FilmvisarnaContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Gets a list of all entities of type T.
        /// </summary>
        /// <returns> An ActionResult containing a list of entities, or NotFound if none found.</returns>
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

        /// <summary>
        /// Gets an entity of type T by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity to retrieve.</param>
        /// <returns>An ActionResult containing the entity, or NotFound if not found.</returns>
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

        /// <summary>
        /// Creates a new entity of type T.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>An ActionResult containing the created entity, or an error status code if unsuccessful.</returns>
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

        /// <summary>
        /// Deletes an entity of type T by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity to delete.</param>
        /// <returns>An ActionResult with a success status code if the entity is deleted, or NotFound if not found.</returns>
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
        /// <summary>
        /// Gets an entity of type T by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity to retrieve.</param>
        /// <returns>An ActionResult containing the entity, or NotFound if not found.</returns>
        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
        }
        
    }
}


      //TODO : Put/Patch
    



