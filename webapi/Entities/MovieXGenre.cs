namespace webapi.Entities;

public class MovieXGenre
{
    public int MovieId { get; set; }
    public int GenreId { get; set; }

    //Navigation properties
    public Movie Movie { get; set; }
    public Genre Genre { get; set; }
}