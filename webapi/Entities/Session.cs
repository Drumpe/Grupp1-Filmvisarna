using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Entities
{
    public class Session: IEntity
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