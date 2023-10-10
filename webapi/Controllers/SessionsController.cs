using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers;
using webapi.Data;

namespace webapi.Entities
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : GenericController<Session>
    {
        public SessionsController(FilmvisarnaContext context) : base(context)
        {
        }
    }
}