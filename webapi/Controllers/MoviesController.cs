using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
        public async Task<IActionResult> DetailedMoviesList()
        {
            var result = await _context.movies     
                .Select(v => new
                {   
                    Id = v.Id,
                    Movie = v.Name,   
                    Genre = v.MoviesXGenres.Select(mxg => mxg.Genre.Name).FirstOrDefault(),
                    Actors = JObject.Parse(v.Description)["actors"].ToObject<List<string>>(),
                    Director = JObject.Parse(v.Description)["director"].ToString(),      
                    Description = JObject.Parse(v.Description)["description"].ToString(), 
                    ProductionYear = JObject.Parse(v.Description)["productionYear"].ToString(), 
                    ProductionCountries = JObject.Parse(v.Description)["productionCountries"].ToObject<List<string>>(),
                    Language = JObject.Parse(v.Description)["language"].ToString(),
                    Subtitles = JObject.Parse(v.Description)["subtitles"].ToString(),                
                    Duration = v.Duration,
                    AgeLimit = v.AgeLimit,
                    //TODO: Reviews= JObject.Parse(v.Description)["reviews"].ToString()
                })
                .ToListAsync();

            return Ok(result);
        }
    }
}