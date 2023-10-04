using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace webapi.ViewModels
{

    public class MakeBookingModel
    {
        //Users table
        public string EmailAdress { get; set; }
        //Bookings table
        [ForeignKey("ScreeningId")]
        public int ScreeningId { get; set; }
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public string BookingNumber { get; set; }
        public DateTime BookingDateTime { get; set; }
        //BookingsXSeats

        public List<BookingXSeat> BookingXSeats { get; set; }

    }
}