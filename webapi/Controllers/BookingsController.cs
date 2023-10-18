using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.IO;
using webapi.Controllers.Utilities;
using webapi.Data;
using webapi.Entities;
using webapi.ViewModels;

namespace webapi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : GenericController<Booking>
    {
        public BookingsController(FilmvisarnaContext context) : base(context)
        {
        }
        [HttpGet("detailed/{id}")]
        public async Task<IActionResult> GetDetailedBookingById(int id)
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
                    ScreeningTime = b.Screening.DateAndTime,

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

        [HttpGet("getbyemail/{emailAddress}")]
        public async Task<IActionResult> GetBookingsDetalsByEmail(string emailAddress)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.EmailAdress == emailAddress);
            if (user == null)
            {
                return BadRequest($"User with email address {emailAddress} does not exist in our database.");
            }
            var userBookings = await _context.bookings
             .Where(b => b.UserId == user.Id)
             .Select(b => new
             {
                 BookingNumber = b.BookingNumber,
                 Movie = b.Screening.Movie.Name,
                 Theater = b.Screening.Theater.Name,
                 Tickets = b.BookingXSeats.Select(bxs => new 
                 {
                    Seat = bxs.Seat.seat,
                    Row = bxs.Seat.Row
                 })
             })
             .ToListAsync();

            if (userBookings.Count == 0)
            {
                return Ok($"User with email address {emailAddress} has no bookings.");
            }
            return Ok(userBookings);
        }

        [HttpGet("number/{bookingNumber}")]
        public async Task<IActionResult> GetBookingByBookingnumber(string bookingNumber)
        {
            var result = await _context.bookings.SingleOrDefaultAsync(b => b.BookingNumber == bookingNumber);

            if (result == null)
            {
                return NotFound($"A booking with the number {bookingNumber} does not exist in our");
            }
            return Ok(result);

        }

        [HttpGet("confirm/{bookingNumber}/{emailAdress}")]

        public async Task<IActionResult> ConfirmExistance(string bookingNumber, string emailAdress)
        {
            var found = await _context.usersAndBookings.FirstOrDefaultAsync(
               x => x.bookingNumber == bookingNumber && x.EmailAdress == emailAdress);

            if (found == null)
            {
                // Handle the case where no matching record is found
                return BadRequest($"A booking with the number: {bookingNumber} and email adress: {emailAdress} does not exist in our database.");
            }

            var foundBookingId = _context.bookings.Where(x => x.Id == found.bookingId);

            var result = await _context.bookings
                 .Where(b => b.Id == found.bookingId)
                 .Select(b => new
                 {
                     bookingId = b.Id,
                     BookingNumber = b.BookingNumber,
                     BookingTime = b.BookingDateTime,
                     FirstName = b.User.FirstName,
                     LastName = b.User.LastName,
                     Email = b.User.EmailAdress,
                     Movie = b.Screening.Movie.Name,
                     Theater = b.Screening.Theater.Name,
                     ScreeningTime = b.Screening.DateAndTime,

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

            return Ok(result);
        }

        [HttpPost("detailed")]
        public async Task<IActionResult> PostBookingModel(MakeBookingModel model)
        {
            User user = await _context.users.SingleOrDefaultAsync(u => u.EmailAdress == model.EmailAdress);

            if (user is null)
            {
                // användaren finns inte skapa den
                user = new User
                {
                    EmailAdress = model.EmailAdress
                };
                _context.users.Add(user);
                await _context.SaveChangesAsync();

            }

            var newBookingNumber = "";

            while (true)
            {
                newBookingNumber = BookingNumberGenerator.GenerateRandomNumber();
                if (await _context.bookings.SingleOrDefaultAsync(b =>
                b.BookingNumber == newBookingNumber) is not null) continue;
                break;
            }

            var booking = new Booking
            {
                ScreeningId = model.ScreeningId,
                UserId = user.Id,
                BookingNumber = BookingNumberGenerator.GenerateRandomNumber(),
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

            //Skicka bara mail om e-postadressen inte innehåller "test"
            if (!model.EmailAdress.Contains("test"))
            {
                //TODO: Skapa body och Subject
                string to = model.EmailAdress;
                string subject = "Bokning av film";
                string body = "Email body content.";
                EmailService.MailBooking(to, subject, body);
            }

            return Ok(response);
        }

        [HttpDelete("RemoveBooking/{bookingNumber}/{EmailAdress}")]

        public async Task<IActionResult> DetelebyBookingNumberAndEmail(string bookingNumber, string emailAdress)
        {

            var found = await _context.usersAndBookings.FirstOrDefaultAsync(
                x => x.bookingNumber == bookingNumber && x.EmailAdress == emailAdress);

            if (found is null)
            {
                return BadRequest($"Given booking number and email adress doesnt match to our database");
            }

            var bookingId = found.bookingId;

            _context.bookingsXseats.RemoveRange(_context.bookingsXseats.Where(x => x.BookingId == bookingId));
            _context.bookings.RemoveRange(_context.bookings.Where(x => x.Id == bookingId));
            var save = await _context.SaveChangesAsync();

            return Ok("Item deleted");

        }




    }


}
