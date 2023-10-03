using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using webapi.Data;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningsController : ControllerBase
    {
        private readonly FilmvisarnaContext _context;

        public ScreeningsController(FilmvisarnaContext context)
        {
            _context = context;
        }

        //Get detailed movie view
        [HttpGet()]
        public async Task<IActionResult> GetScreeningByMovieId()
        {
            var result = await _context.screenings     
                .Select(v => new
                {   
                    Id = v.Id
                })
                .ToListAsync();

            return Ok(result);
        }
    }
}