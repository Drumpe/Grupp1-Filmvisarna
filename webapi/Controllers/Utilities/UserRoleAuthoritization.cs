using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using webapi.Data;

namespace webapi.Controllers.Utilities
{
    public class AuthorizeUserRole : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<FilmvisarnaContext>(); //get db context (cant fetch via controller) filters not part of DI container by default
            var userRole = context.HttpContext.Session.GetString("UserRole"); // get session user role
            var endpoint = context.HttpContext.Request.Path.Value; // get the endpoint we call from
            endpoint = Regex.Replace(endpoint, @"/\d+$", "");

            var httpMethod = context.HttpContext.Request.Method; // get the request method (get, post)
            var requiredUserRoles = new List<string>();



            try
            {
                // Find all rows in the database that correspond to the endpoint and request method
                var auths = dbContext.authorizations
                    .Include(a => a.UserRoles)
                    .Where(a => a.Endpoint == endpoint && a.HttpMethod == httpMethod)
                    .ToList();

                // try to set required userRoles in variable
                requiredUserRoles.AddRange(auths.Select(a => a.UserRoles.Name));
            }
            // catch if endpoint is not yet in db
            catch (Exception e)
            {
                System.Console.WriteLine("Unauthorized");
                context.Result = new UnauthorizedResult();
                return;
            }
            // reject authorization if userrole doesnt match
            if (!requiredUserRoles.Contains(userRole))
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}