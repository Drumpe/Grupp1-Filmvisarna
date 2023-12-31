using Microsoft.EntityFrameworkCore;
using webapi.Entities;
using webapi.ViewModels;

namespace webapi.Data
{
    public class FilmvisarnaContext : DbContext
    {

        public DbSet<Booking> bookings { get; set; }
        public DbSet<BookingXSeat> bookingsXseats { get; set; }
        public DbSet<Genre> genres { get; set; }
        public DbSet<Movie> movies { get; set; }
        public DbSet<MovieXGenre> moviesXgenres { get; set; }
        public DbSet<PriceCategory> priceCategories { get; set; }
        public DbSet<Screening> screenings { get; set; }
        public DbSet<Seat> seats { get; set; }
        public DbSet<Theater> theaters { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UsersAndBookings> usersAndBookings { get; set; }
        public DbSet<Authorization> authorizations { get; set; }
        public DbSet<UserRole> userRoles { get; set; }


        public FilmvisarnaContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieXGenre>()
                .HasKey(m => new { m.MovieId, m.GenreId });

            modelBuilder.Entity<BookingXSeat>()
                .HasKey(bs => new { bs.BookingId, bs.SeatId });

            modelBuilder.Entity<UsersAndBookings>()
                .HasKey(x => new { x.bookingId });
        }

    }
}