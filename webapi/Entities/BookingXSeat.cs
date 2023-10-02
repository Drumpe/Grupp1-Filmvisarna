using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class BookingXSeat
{
    public int Id { get; set; }
    [ForeignKey("BookingId")]
    public int BookingId { get; set; }
    [ForeignKey("SeatId")]
    public int SeatId { get; set; }
    [ForeignKey("PriceCategoryId")]
    public int PriceCategoryId { get; set; }

    // Navigation properties
    public Booking Booking { get; set; }
    public Seat Seat { get; set; }
    public PriceCategory PriceCategory { get; set; }
}