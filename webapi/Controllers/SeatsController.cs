using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : GenericController<Screening>
    {
        public SeatsController(FilmvisarnaContext context) : base(context) {}

        [HttpGet("screening/{screeningid}")]
        public async Task<IActionResult> GetSeatsFromScreening(int screeningId)
        {
          var booked = await _context.screenings
            .Where(s => s.Id == screeningId)
            .Join(
                _context.theaters,
                s => s.TheaterId,
                t => t.Id,
                (s, t) => new { Screening = s, Theater = t }
            )
            .GroupJoin(
                _context.seats,
                st => st.Theater.Id,
                sts => sts.TheaterId,
                (st, seats) => new { Screening = st.Screening, Theater = st.Theater, Seats = seats }
            )
            .SelectMany(
                sts => sts.Seats.DefaultIfEmpty(),
                (sts, seat) => new { Screening = sts.Screening, Theater = sts.Theater, Seat = seat }
            )
            .Join(
                _context.bookingsXseats,
                sts => sts.Seat.Id,
                bxs => bxs.SeatId,
                (sts, bxs) => new { Screening = sts.Screening, Theater = sts.Theater, BookingXSeat = bxs }
            )
            .Where(joined => _context.bookings
                .Where(b => b.ScreeningId == joined.Screening.Id)
                .Select(b => b.Id)
                .Contains(joined.BookingXSeat.BookingId)
            )
            .Select(joined => joined.BookingXSeat.SeatId)
            .Distinct()
            .ToListAsync();

            var all = await _context.screenings
            .Where(s => s.Id == screeningId)
            .Select(s => s.Theater.Seats
            .Select(sts => new 
            {
              Status = sts.Id
            }))
            .ToListAsync();
            
          var result = await _context.screenings
            .Where(s => s.Id == screeningId)
            .Select(s => new
            {
              TheaterId = s.Theater.Id,
              Theater = s.Theater.Name,
              Seats = s.Theater.Seats
              .Select(sts => new 
              {
                SeatId = sts.Id,
                Seat = sts.seat,
                Row = sts.Row,
                Status = booked.Contains(sts.Id) ? 1 : 0
              })
            })
            .FirstOrDefaultAsync();

          return Ok(result);
        }

        /* [HttpGet("screening/{screeningid}/status")]
        public async Task<IActionResult> GetSeatStatusFromScreening(int screeningId)
        {
            var booked = await _context.screenings
            .Where(s => s.Id == screeningId)
            .Join(
                _context.theaters,
                s => s.TheaterId,
                t => t.Id,
                (s, t) => new { Screening = s, Theater = t }
            )
            .GroupJoin(
                _context.seats,
                st => st.Theater.Id,
                sts => sts.TheaterId,
                (st, seats) => new { Screening = st.Screening, Theater = st.Theater, Seats = seats }
            )
            .SelectMany(
                sts => sts.Seats.DefaultIfEmpty(),
                (sts, seat) => new { Screening = sts.Screening, Theater = sts.Theater, Seat = seat }
            )
            .Join(
                _context.bookingsXseats,
                sts => sts.Seat.Id,
                bxs => bxs.SeatId,
                (sts, bxs) => new { Screening = sts.Screening, Theater = sts.Theater, BookingXSeat = bxs }
            )
            .Where(joined => _context.bookings
                .Where(b => b.ScreeningId == joined.Screening.Id)
                .Select(b => b.Id)
                .Contains(joined.BookingXSeat.BookingId)
            )
            .Select(joined => joined.BookingXSeat.SeatId)
            .Distinct()
            .ToListAsync();

            var all = await _context.screenings
            .Where(s => s.Id == screeningId)
            .Select(s => s.Theater.Seats
            .Select(sts => new 
            {
              Status = sts.Id
            }))
            .ToListAsync();
            
            return Ok(result);
        } */
    }
}


