namespace webapi.Entities;

public class Theater: BaseEntity
{
public ICollection<Seat> Seats { get; set; }
public ICollection<Screening> Screening { get; set; }
}