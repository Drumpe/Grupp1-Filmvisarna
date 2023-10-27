using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class Theater: IEntity
{
    [Column("TheaterId")]
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Seat> Seats { get; set; }
    public ICollection<Screening> Screening { get; set; }
}