using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using webapi.Controllers.Utilities;

namespace webapi.Entities
{
    public class UserRole : IEntity
    {
        [Column("UserRoleId")]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Authorization> Authorizations { get; set; }
    }
}