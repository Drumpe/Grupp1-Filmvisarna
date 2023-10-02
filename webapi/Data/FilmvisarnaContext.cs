using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace ministers_of_sweden.api.Data
{
    public class FilmvisarnaContext : DbContext
    {

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingXSeat> BookingsXSeats { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Movie> Movies {get; set;}
        public DbSet<MovieXGenre> MoviesXGenres {get; set;}
        public DbSet<PriceCategory> PriceCategories {get; set;}
        public DbSet<Screening> Screenings {get; set;}
        public DbSet<Seat> Seats {get; set;}
        public DbSet<Theater> Theaters {get; set;}
        public DbSet<User> Users {get; set;}

        public FilmvisarnaContext(DbContextOptions options) : base(options){ }

    }
}