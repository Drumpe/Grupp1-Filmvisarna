using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class MovieXGenre
{
    [ForeignKey("MovieId")]
    public int MovieId { get; set; }
    [ForeignKey("GenreId")]
    public int GenreId { get; set; }

    //Navigation properties
    public Movie Movie { get; set; }
    public Genre Genre { get; set; }
}