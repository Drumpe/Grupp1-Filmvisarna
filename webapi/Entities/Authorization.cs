using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using webapi.Controllers.Utilities;


namespace webapi.Entities;
public class Authorization : IEntity
{
    [Column("AuthorizationId")]
    public int Id { get; set; }
    public string Endpoint { get; set; }
    public string RequestMethod { get; set; }
    [ForeignKey("UserRoleId")]
    public int UserRoleId { get; set; }

    public UserRole UserRoles { get; set; }
}