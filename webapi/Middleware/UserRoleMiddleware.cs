using webapi.Controllers.Utilities;

namespace webapi.Middleware
{
    public class UserRoleMiddleware
    {
        private readonly RequestDelegate _next;

        // Constructor for the middleware, takes the next middleware as a parameter and returns a task
        public UserRoleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        // The main method for the middleware, invoked when a request is processed.
        public async Task InvokeAsync(HttpContext context)
        {
            // If the user is not a member
            if (context.Session.GetString("UserRole") is null)
            {
                // Set the user's role in the session to "guest."
                context.Session.SetString("UserRole", UserRole.guest.ToString());
            }

            // Pass the request to the next middleware in the pipeline.
            await _next(context);
        }
    }
}

