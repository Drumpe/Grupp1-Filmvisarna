namespace webapi.Entities;

public class User
{
public int Id { get; set; }
public string FirstName { get; set; }
public string LastName { get; set; }
public string EmailAdress { get; set; }

//Navigation property
public ICollection<Booking> Bookings { get; set; }
}