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
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<FilmvisarnaContext>();
            var userRole = context.HttpContext.Session.GetString("UserRole");
            var endpoint = context.HttpContext.Request.Path.Value;
            endpoint = Regex.Replace(endpoint, @"/\d+$", "");
            var httpMethod = context.HttpContext.Request.Method;
            var allowedUsers = new List<string>();

            // following is a temporary fix to be able to handle our current endpoints
            string prefix = "/api/Bookings/confirm";
            string prefix2 = "/api/Bookings/RemoveBooking";
            string prefix3 = "/api/bookings/getbyemail";
            string prefix4 = "/api/bookings/detailed";

            if (endpoint.StartsWith(prefix))
            {
                endpoint = endpoint.Remove(prefix.Length);
            }
            else if (endpoint.StartsWith(prefix2))
            {
                endpoint = endpoint.Remove(prefix2.Length);
            }
            else if (endpoint.StartsWith(prefix3))
            {
                endpoint = endpoint.Remove(prefix3.Length);
            }
            else if (endpoint.StartsWith(prefix4))
            {
                endpoint = endpoint.Remove(prefix4.Length);
            }

            try
            {
                var auths = dbContext.authorizations
                    .Include(a => a.UserRoles)
                    .Where(a => a.Endpoint == endpoint && a.HttpMethod == httpMethod)
                    .ToList();
                allowedUsers.AddRange(auths.Select(a => a.UserRoles.Name));
            }

            catch (Exception e)
            {
                System.Console.WriteLine($"Unauthorized, {e}");
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!allowedUsers.Contains(userRole))
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}