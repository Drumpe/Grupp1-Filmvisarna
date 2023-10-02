namespace webapi.Entities;

public class Movie : BaseEntity
{
    public int Duration { get; set; }
    public string Description { get; set; }
    public int AgeLimit { get; set; }
    public string TrailerURL { get; set; }

    //Navigation properties
    public ICollection<MovieXGenre> MoviesXGenres { get; set; }
    public ICollection<Screening> Screenings { get; set; }

}