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

        //Get a detailed list of all movies
        [HttpGet()]
        public async Task<IActionResult> ListAll()
        {
            var result = await _context.movies     
                .Select(v => new
                {   
                    Id = v.Id,
                    Movie = v.Name,   
                    TrailerURL = v.TrailerURL,
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
                    Images = JObject.Parse(v.Description)["images"].ToObject<List<string>>()
                    //TODO: Reviews= JObject.Parse(v.Description)["reviews"].ToString()
                })
                .ToListAsync();

            return Ok(result);
        }
        //Get detailed movie view of chosen ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
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
                    Images = JObject.Parse(v.Description)["images"].ToObject<List<string>>()
                    //TODO: Reviews= JObject.Parse(v.Description)["reviews"].ToString()
                })
                .SingleOrDefaultAsync(c => c.Id == id);

            return Ok(result);
        }
    }
}