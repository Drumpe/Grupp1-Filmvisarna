namespace webapi.Entities;

public class BookingXSeat
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public int SeatId { get; set; }
    public int PriceCategoryId { get; set; }

    // Navigation properties
    public Booking Booking { get; set; }
    public Seat Seat { get; set; }
    public PriceCategory PriceCategory { get; set; }
}