using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : GenericController<Genre>
    {
        public GenresController(FilmvisarnaContext context) : base(context)
        {
        }
    }
}