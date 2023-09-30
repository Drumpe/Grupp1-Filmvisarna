namespace webapi.Entities;

public class Bookings
{
   public int Id { get; set; }
   public string BookingNumber { get; set; }
   public DateTime BookingDateTime { get; set; }
   public int UserId { get; set; }
   public int ScreeningId { get; set; }
   
}