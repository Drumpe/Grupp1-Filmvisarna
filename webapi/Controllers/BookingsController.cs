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
                try
                {
                    string filePath = "Properties/config.json";
                    ConfigEmail config;
                    using (Stream fileStream = System.IO.File.OpenRead(filePath))
                    {
                        config = await JsonSerializer.DeserializeAsync<ConfigEmail>(fileStream);
                    }
                    EmailConfiguration emailConfig = new EmailConfiguration
                    {
                        SmtpServer = "smtp.gmail.com",
                        SmtpPort = 587,
                        Email = config.EmailForServerSentEmails,
                        Password = config.PasswordForServerSentEmails
                    };

                    EmailService emailService = new EmailService(emailConfig);

                    //TODO: Skapa body och Subject
                    string to = model.EmailAdress;
                    string subject = "Bokning av film";
                    string body = "Email body content.";

                    emailService.SendEmail(to, subject, body);

                }
                catch (Exception e)
                {
                    Console.WriteLine($"Email Sending failed.  {e.Message}");
                    throw;
                }
            }

            return Ok(response);
        }


    }


}
