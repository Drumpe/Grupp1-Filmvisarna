using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers.Utilities;
using webapi.Data;
using webapi.Entities;
using webapi.ViewModels;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly FilmvisarnaContext _context;

        public BookingsController(FilmvisarnaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var result = await _context.bookings
                .Where(b => b.Id == id)
                .Select(b => new
                {
                    BookingNumber = b.BookingNumber,
                    BookingTime = b.BookingDateTime,
                    FirstName = b.User.FirstName,
                    LastName = b.User.LastName,
                    Email = b.User.EmailAdress,
                    Movie = b.Screening.Movie.Name,
                    Theater = b.Screening.Theater.Name,
                    Tickets = b.BookingXSeats.Select(bxs => new
                    {
                        Row = bxs.Seat.Row,
                        Seat = bxs.Seat.seat,
                        Type = bxs.PriceCategory.Name,
                        Price = bxs.PriceCategory.Price,
                        SeatId = bxs.Seat.Id
                    })
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        [HttpPost()]
        public async Task<IActionResult> Post(MakeBookingModel model)
        {
            if (await _context.users.SingleOrDefaultAsync(b => b.EmailAdress == model.EmailAdress) is not null)
                return BadRequest($"A user with the email address {model.EmailAdress} already exists in our system.");

            var user = new User
            {
                EmailAdress = model.EmailAdress
            };

            _context.users.Add(user);
            await _context.SaveChangesAsync();

            var booking = new Booking
            {
                ScreeningId = model.ScreeningId,
                UserId = user.Id,
                BookingNumber = BookingNumberGenerator.GenerateRandomBookingNumber(),
                BookingDateTime = DateTime.Now
            };

            _context.bookings.Add(booking);
            await _context.SaveChangesAsync();

            foreach (var bookingXSeatModel in model.BookingXSeats)
            {

                var seatBookings = new BookingXSeat
                {
                    BookingId = booking.Id,
                    SeatId = bookingXSeatModel.SeatId,
                    PriceCategoryId = bookingXSeatModel.PriceCategoryId
                };

                _context.bookingsXseats.Add(seatBookings);
            }

            await _context.SaveChangesAsync();

            var response = new
            {
                BookingId = booking.Id
            };

            return Ok(response);
        }


    }


}
