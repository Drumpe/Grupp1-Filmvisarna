namespace webapi.Entities;

public class Theater
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Seat> Seats { get; set; }
    public ICollection<Screening> Screening { get; set; }
}