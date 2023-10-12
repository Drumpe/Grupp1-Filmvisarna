namespace webapi.Middleware 
{
  public static class SeatStatusFeedMiddlewareExtensions 
  {
    public static IApplicationBuilder UseSeatStatusFeed(this IApplicationBuilder builder) =>
      builder.UseMiddleware<SeatStatusFeedMiddleware>();
  }
}