using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;

namespace webapi.Middleware
{
  public class SeatStatusFeedMiddleware
  {
	private readonly RequestDelegate _next;
	private readonly WebSocketConnectionManager _manager;

	public SeatStatusFeedMiddleware(RequestDelegate next, WebSocketConnectionManager manager)
	{
	  _next = next;
	  _manager = manager;
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
		string connectionId = _manager.AddConnection(connection);
		
		Console.WriteLine($"Connection from ${connectionId} established...");

		await RecieveMessageAsync(connection, async (result, buffer) => 
		{
			if (result.MessageType == WebSocketMessageType.Close) 
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

	/*// Send connection id to client  
	private async Task SendConnIdAsync(WebSocket socket, string connId) 
	{
		var buffer = Encoding.UTF8.GetBytes($"ConnId: {connId}");
		await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
	} */
  }
}