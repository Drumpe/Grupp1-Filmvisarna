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

        //Get every screening available for specific movie
        [HttpGet("{movieId}/screenings")]
        public async Task<IActionResult> GetMovieScreenings(int movieId)
        {
            var movieInfo = await _context.movies
                .Where(m => m.Id == movieId)
                .Select(m => new
                {
                    MovieName = m.Name,
                    Screenings = m.Screenings.Select(s => s.DateAndTime).ToList()
                })
                .FirstOrDefaultAsync();

            if (movieInfo == null)
            {
                return NotFound();
            }

            return Ok(movieInfo);
        }
        

   [HttpGet("{id}")]
        public async Task<IActionResult> GetBookedSeatsForScreening(int id)
        {
            var result = await _context.screenings
                .Where(v => v.Id == id)
                .Select(v => new
                {
                    Id = v.Id,
                    Theater = v.Theater.Name,
                    Movie = v.Movie.Name,
                    TotalSeatsInTheater = v.Theater.Seats.Count(),
                    BookedSeats = v.Bookings
                        .SelectMany(b => b.BookingXSeats)
                        .Select(bxs => new
                        {
                            SeatNumber = bxs.SeatId
                        })
                })
                .FirstOrDefaultAsync();

            return Ok(result);
        }



        
    }
}