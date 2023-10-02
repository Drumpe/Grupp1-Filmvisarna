using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace webapi.Entities;

public class Movie {
    
    [Key]
    [Column("MovieId")]
    public int MovieId { get; set; }
    public string Name {get; set;}
    public int Duration { get; set; }
    public string Description { get; set; }
    public int AgeLimit { get; set; }
    public string TrailerURL { get; set; }

    //Navigation properties
    public ICollection<MovieXGenre> MoviesXGenres { get; set; }
    public ICollection<Screening> Screenings { get; set; }

}