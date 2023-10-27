using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Utilities;
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