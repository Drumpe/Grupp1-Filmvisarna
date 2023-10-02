namespace webapi.Entities;

public class Booking
{
   public int Id { get; set; }
   public string BookingNumber { get; set; }
   public DateTime BookingDateTime { get; set; }
   public int UserId { get; set; }
   public int ScreeningId { get; set; }


   // Navigation properties
   public User User { get; set; }
   public Screening Screening { get; set; }
   public ICollection<BookingXSeat> BookingXSeats { get; set; }

}