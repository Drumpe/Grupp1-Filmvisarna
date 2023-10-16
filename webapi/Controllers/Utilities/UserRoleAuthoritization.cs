using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using webapi.Data;

namespace webapi.Controllers.Utilities
{
    public class UserRoleAuthoritization : AuthorizeAttribute, IAuthorizationFilter
    {
        public FilmvisarnaContext _context { get; }
        public UserRoleAuthoritization(FilmvisarnaContext context)
        {
            _context = context;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.Session.GetString("UserRole");
            var endpoint = "/movies";
            //context.HttpContext.Request.Path.Value;

            var acl = _context.authorizations.FirstOrDefault(a => a.Endpoint == endpoint);

            var model = new {
                Endpoint = acl.Endpoint,
                Role = acl.UserRoles.Name
            };

            if (user != model.Role)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}