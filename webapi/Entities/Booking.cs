using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class Booking
{
   [Column("BookingId")]
   public int Id { get; set; }
   public string BookingNumber { get; set; }
   public DateTime BookingDateTime { get; set; }
   [ForeignKey("UserId")]
   public int UserId { get; set; }
   [ForeignKey("ScreeningId")]
   public int ScreeningId { get; set; }

   // Navigation properties
   public User User { get; set; }
   public Screening Screening { get; set; }
   public ICollection<BookingXSeat> BookingXSeats { get; set; }

}