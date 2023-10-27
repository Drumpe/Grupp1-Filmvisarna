using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Entities;

public class Booking: IEntity
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
   [JsonIgnore] 
   public User User { get; set; }
   public Screening Screening { get; set; }
   public ICollection<BookingXSeat> BookingXSeats { get; set; }

}