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

        //Get detailed movie view
        [HttpGet()]
        public async Task<IActionResult> ListAllMovies()
        {
            var result = await _context.movies     
                .Select(v => new
                {   
                    Id = v.Id,
                    Movie = v.Name,                              
                    Duration = v.Duration,
                    AgeLimit = v.AgeLimit,
                    Description = JObject.Parse(v.Description)["description"].ToString(), 
                    Genre = v.MoviesXGenres.Select(mxg => mxg.Genre.Name)
                    .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(result);
        }
    }
}