using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using webapi.Data;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly FilmvisarnaContext _context;

        public MoviesController(FilmvisarnaContext context)
        {
            _context = context;
        }

        //Get movies bara från movie table
        [HttpGet()]
        public async Task<IActionResult> ListAllMovies()
        {
            var result = await _context.Genres     
                // .Include(m => m.MoviesXGenres)
                // .ThenInclude(mxg => mxg.Genre)
                .Select(v => new
                {   
                    Id = v.Id,
                    Movie = v.Name,
                    // Genre = v.MoviesXGenres.Select(mxg => mxg.Genre.Name)
                    // .FirstOrDefault(),
                    // Duration = v.Duration,
                    // AgeLimit = v.AgeLimit,
                    // Plot = JObject.Parse(v.Description)["plot"].ToString(), 
                })
                .ToListAsync();

            return Ok(result);
        }
    }
}