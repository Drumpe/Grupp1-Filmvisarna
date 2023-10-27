using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class Seat
{
    [Column("SeatId")]
    public int Id { get; set; }

    [ForeignKey("TheaterId")]
    public int TheaterId { get; set; }
    public int seat { get; set; }
    public int Row { get; set; }

    // Navigation property
    public Theater Theater { get; set; }
    public ICollection<BookingXSeat> BookingXSeats { get; set; }
}