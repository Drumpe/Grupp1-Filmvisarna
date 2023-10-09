using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheatersController : GenericController<Theater>
    {
        public TheatersController(FilmvisarnaContext context) : base(context)
        {
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailedTheaterById(int id)
        {
            var result = await _context.theaters
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    Id = t.Id,
                    Theater = t.Name,
                    Seats = t.Seats.Select(s => new
                    {
                        SeatId = s.Id,
                        Seat = s.seat,
                        Row = s.Row,

                    })
                })
                .FirstOrDefaultAsync();

            return Ok(result);
        }
    }
}