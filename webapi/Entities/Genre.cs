namespace webapi.Entities;

public class Genre: BaseEntity
{
   //Navigation properties
    public ICollection<MovieXGenre> MoviesXGenres { get; set; }
}