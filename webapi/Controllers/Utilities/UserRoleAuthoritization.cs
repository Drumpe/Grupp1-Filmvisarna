using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
            var httpMethod = context.HttpContext.Request.Method; // get the request method (get, post)
            var requiredUserRole = "";

            try
            {
                // find the row in db that corresponds to endpoint + request method
                var auth = dbContext.authorizations
                .Include(a => a.UserRoles)
                .FirstOrDefault(a => a.Endpoint == endpoint && a.HttpMethod == httpMethod);

                // try to set required userRole in variable
                requiredUserRole = auth.UserRoles.Name;
            }
            // catch if endpoint is not yet in db
            catch (Exception e)
            {
                System.Console.WriteLine("Unauthorized");
                context.Result = new UnauthorizedResult();
                return;
            }
            // reject authorization if userrole doesnt match
            if (userRole != requiredUserRole)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}