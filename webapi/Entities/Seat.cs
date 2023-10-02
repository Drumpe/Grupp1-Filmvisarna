namespace webapi.Entities;

public class Seat
{
    public int Id { get; set; }
    public int TheaterId { get; set; }
    public int Number { get; set; }
    public int Row { get; set; }
    public bool IsAvaliable { get; set; }


    // Navigation property
    public Theater Theater { get; set; }
    public ICollection<BookingXSeat> BookingXSeats { get; set; }
}