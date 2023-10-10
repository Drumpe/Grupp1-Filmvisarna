using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities
{
    public class Sessions: IEntity
    {
        [Column("Sessionid")]
        public int Id { get; set; }
        public string SessionKey { get; set; }
        public string UserRole { get; set; }

        [ForeignKey("UserId")]
        public int UserId {get; set;}

        public User User {get; set;}

    }
}