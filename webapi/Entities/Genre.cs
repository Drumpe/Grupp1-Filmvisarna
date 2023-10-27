using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class Genre: IEntity
{
    [Column("GenreId")]
    public int Id { get; set; }
    public string Name { get; set; }
    // Navigation properties
    public ICollection<MovieXGenre> MoviesXGenres { get; set; }
}