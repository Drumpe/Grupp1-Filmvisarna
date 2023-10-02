namespace webapi.Entities;

public class Screening
{
   public int Id { get; set; }
   public DateTime dateAndTime { get; set; }
   public int MovieId { get; set; }
   public int TheaterId { get; set; }

   //Navigation properties
   public Movie Movie { get; set; }
   public Theater Theater { get; set; }
   public ICollection<Booking> Bookings { get; set; }

}