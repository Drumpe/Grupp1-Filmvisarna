namespace webapi.Middleware 
{
  public static class MiddlewareExtensions 
  {
    public static IApplicationBuilder UseSeatStatusFeed(this IApplicationBuilder builder) =>
      builder.UseMiddleware<SeatStatusFeedMiddleware>();

    public static IApplicationBuilder UseUserRoles(this IApplicationBuilder builder) =>
      builder.UseMiddleware<UserRoleMiddleware>();

    public static IServiceCollection AddWebSocketConnectionManager(this IServiceCollection services) 
    {
      services.AddSingleton<WebSocketConnectionManager>();
      return services;
    }
  }
}