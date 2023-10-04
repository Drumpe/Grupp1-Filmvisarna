using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheatersController : ControllerBase
    {
        private readonly FilmvisarnaContext _context;

        public TheatersController(FilmvisarnaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
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