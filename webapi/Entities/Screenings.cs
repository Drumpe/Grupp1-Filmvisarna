namespace webapi.Entities;

public class Screenings
{
   public int Id { get; set; }
   public DateTime dateAndTime { get; set; }
   public int MovieId {get; set;}
   public int TheaterId { get; set; }
   
}