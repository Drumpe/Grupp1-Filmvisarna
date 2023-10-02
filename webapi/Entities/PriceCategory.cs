namespace webapi.Entities;

public class PriceCategory: BaseEntity
{
    public decimal Price { get; set; }

    //Navigation properties
    public ICollection<BookingXSeat> BookingXSeats { get; set; }
   
}