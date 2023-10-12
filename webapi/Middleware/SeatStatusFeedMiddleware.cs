using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;

namespace webapi.Middleware
{
  public class SeatStatusFeedMiddleware
  {
	private readonly RequestDelegate _next;

	public SeatStatusFeedMiddleware(RequestDelegate next)
	{
	  _next = next;
	}

	public async Task Invoke(HttpContext context) 
	{
		if (context.WebSockets.IsWebSocketRequest) {
			// Validation, authorization etc, etc, etc

			await AcceptAsync(context);
		} 
		else {
			await _next(context);
		}
	}

	public async Task AcceptAsync(HttpContext context) 
	{
		WebSocket connection = await context.WebSockets.AcceptWebSocketAsync();
		Console.WriteLine("Connection established...");

		await RecieveMessageAsync(connection, async (result, buffer) => 
		{
			if (result.MessageType == WebSocketMessageType.Close) 
			{
				await connection.CloseAsync(result.CloseStatus!.Value, result.CloseStatusDescription, CancellationToken.None);
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
  }
}