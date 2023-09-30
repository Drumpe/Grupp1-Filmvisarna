namespace webapi.Entities;

public class Movies: BaseEntity
{
    public int Duration { get; set; }
    public string Description { get; set; }
    public int AgeLimit {get; set;}
    public string TrailerURL { get; set; }

}