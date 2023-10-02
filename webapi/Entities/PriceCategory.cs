namespace webapi.Entities;

public class PriceCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }

    //Navigation properties
    public ICollection<BookingXSeat> BookingXSeats { get; set; }

}