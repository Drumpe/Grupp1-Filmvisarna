using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;
using webapi.Middleware;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
      public readonly FilmvisarnaContext _context;
			private readonly WebSocketConnectionManager _manager;
      public SeatsController(FilmvisarnaContext context, WebSocketConnectionManager manager) 
      {
        _context = context;
				_manager = manager;
      }

      [HttpGet("screening/{screeningid}")]
      public async Task<IActionResult> GetSeatsFromScreening(int screeningId)
      {
        var booked = await _context.screenings
          .Where(s => s.Id == screeningId)
          .Join(
              _context.theaters,
              s => s.TheaterId,
              t => t.Id,
              (s, t) => new { Screening = s, Theater = t }
          )
          .GroupJoin(
              _context.seats,
              st => st.Theater.Id,
              sts => sts.TheaterId,
              (st, seats) => new { Screening = st.Screening, Theater = st.Theater, Seats = seats }
          )
          .SelectMany(
              sts => sts.Seats.DefaultIfEmpty(),
              (sts, seat) => new { Screening = sts.Screening, Theater = sts.Theater, Seat = seat }
          )
          .Join(
              _context.bookingsXseats,
              sts => sts.Seat.Id,
              bxs => bxs.SeatId,
              (sts, bxs) => new { Screening = sts.Screening, Theater = sts.Theater, BookingXSeat = bxs }
          )
          .Where(joined => _context.bookings
              .Where(b => b.ScreeningId == joined.Screening.Id)
              .Select(b => b.Id)
              .Contains(joined.BookingXSeat.BookingId)
          )
          .Select(joined => joined.BookingXSeat.SeatId)
          .Distinct()
          .ToListAsync();
          
        var result = await _context.screenings
          .Where(s => s.Id == screeningId)
          .Select(s => new
          {
            TheaterId = s.Theater.Id,
            Theater = s.Theater.Name,
            Seats = s.Theater.Seats
            .Select(sts => new 
            {
              SeatId = sts.Id,
              Booked = booked.Contains(sts.Id) ? 1 : 0
            })
          })
          .FirstOrDefaultAsync();

        return Ok(result);
      }

			[HttpGet("status")]
			public async Task GetTaskAsync(HttpContext context) 
			{
				if (!context.WebSockets.IsWebSocketRequest) {
					context.Response.StatusCode = 400;
				}

				if (context.WebSockets.IsWebSocketRequest) {
					// Validation, authorization etc, etc, etc

					await AcceptAsync(context);
				} else {
					context.Response.StatusCode = 403;
				}
			}

			public async Task AcceptAsync(HttpContext context) 
			{
				WebSocket connection = await context.WebSockets.AcceptWebSocketAsync();
				string connectionId = _manager.AddConnection(connection);
				
				Console.WriteLine($"Connection from ${connectionId} established...");

				await RecieveMessageAsync(connection, async (result, buffer) => 
				{
					if (result.MessageType == WebSocketMessageType.Text) 
					{
						// input sanitization
						// idea: whitelisting input? otherwise close connection? Something went wrong, redirect?
						var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
						Console.WriteLine($"Message recieved from {connectionId} ...");
						Console.WriteLine($"Message: {message}");
						await BroadcastJSONMessageAsync($"{message}");
						return;
					}
					else if (result.MessageType == WebSocketMessageType.Close)
					{
						Console.WriteLine($"Closing request from {connectionId} recieved.");
						if (!_manager.GetAllConnections().TryRemove(connectionId, out WebSocket _connection)) {
							Console.Error.Write($"Connection id: {connectionId} not found in manager.");
						}

						await _connection.CloseAsync(result.CloseStatus!.Value, result.CloseStatusDescription, CancellationToken.None);
						Console.WriteLine($"({connectionId}), CloseStatus: {result.CloseStatus!.Value}");
						return;
					}
				});
			}
			private async Task RecieveMessageAsync(WebSocket ws, Action<WebSocketReceiveResult, byte[]> handleMessage) 
			{
				var buffer = new byte[1024 * 4];
				while (ws.State == WebSocketState.Open) 
				{
					var result = await ws.ReceiveAsync(buffer: new ArraySegment<byte>(buffer),
						cancellationToken: CancellationToken.None);

					handleMessage(result, buffer);
				}
			}

			public async Task BroadcastJSONMessageAsync(string message) 
			{
				var messageObj = JsonConvert.DeserializeObject<dynamic>(message);

				foreach(var connection in _manager.GetAllConnections()) {
					if (connection.Value.State == WebSocketState.Open) {
						await connection.Value.SendAsync(Encoding.UTF8.GetBytes(messageObj!.message.ToString()),
							WebSocketMessageType.Text, true, CancellationToken.None);
					}
				}
			}

			/*// Send connection id to client  
			private async Task SendConnIdAsync(WebSocket socket, string connId) 
			{
				var buffer = Encoding.UTF8.GetBytes($"ConnId: {connId}");
				await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
			} */
  }
}


