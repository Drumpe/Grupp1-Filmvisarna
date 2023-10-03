using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class User
{
[Column("UserId")]
public int Id { get; set; }
public string FirstName { get; set; }
public string LastName { get; set; }
public string EmailAdress { get; set; }

//Navigation property
public ICollection<Booking> Bookings { get; set; }
}