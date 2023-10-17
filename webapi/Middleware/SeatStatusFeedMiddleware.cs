using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace webapi.Middleware
{
  public class SeatStatusFeedMiddleware
  {
	private readonly RequestDelegate _next;
	private readonly WebSocketConnectionManager _manager;
	private static List<string> _allowedOrigins = new List<string> {
		"http://localhost:5173/",
		"https://localhost:5173/"
	};

	public SeatStatusFeedMiddleware(RequestDelegate next, WebSocketConnectionManager manager)
	{
	  _next = next;
	  _manager = manager;
	}

	public async Task Invoke(HttpContext context) 
	{
		if (!context.WebSockets.IsWebSocketRequest) {
			await _next(context);
		}

	if (context.WebSockets.IsWebSocketRequest) {
		// Validation, authorization etc, etc, etc

		Console.WriteLine($"\n\n{context.Request.Headers.Origin}");
		
		await AcceptAsync(context);
		
		/* if (_allowedOrigins.Contains(context.Request.Headers.Origin)) {
			await AcceptAsync(context);
		} else {
			context.Response.StatusCode = 403;
			return;
		} */
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
			string data = Encoding.UTF8.GetString(buffer, 0, result.Count);
			Console.WriteLine($"Message recieved from {connectionId} ...");

			JsonDocument message = JsonDocument.Parse(data);
			if (message != null) 
			{
				JsonElement status;
				if (!message!.RootElement.TryGetProperty("status", out status)) {
					await CloseClientAsync(connectionId);
					return;
				}
				if (status.ToString() == "booked") {
					await BroadcastAsync(data);
				}
				else {
					await CloseClientAsync(connectionId);
					return;
				}
			}
		}
		else if (result.MessageType == WebSocketMessageType.Close)
		{
			Console.WriteLine($"Closing request from {connectionId} recieved.");
			if (!_manager.GetAllConnections().TryRemove(connectionId, out WebSocket _connection)) {
				Console.Error.Write($"Connection id: {connectionId} not found in manager.");
			}

			await _connection.CloseOutputAsync(result.CloseStatus!.Value, result.CloseStatusDescription, CancellationToken.None);
			Console.WriteLine($"({connectionId}), CloseStatus: {result.CloseStatus!.Value}");
			return;
		}
		else 
		{
			await CloseClientAsync(connectionId);
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

public async Task BroadcastAsync(string message) 
{
	foreach(var connection in _manager.GetAllConnections()) {
		if (connection.Value.State == WebSocketState.Open) {
			await connection.Value.SendAsync(Encoding.UTF8.GetBytes(message),
				WebSocketMessageType.Text, true, CancellationToken.None);
		}
	}
}

/* public async Task BroadcastJSONMessageAsync(string message) 
{
	var messageObj = JsonConvert.DeserializeObject<dynamic>(message);

	foreach(var connection in _manager.GetAllConnections()) {
		if (connection.Value.State == WebSocketState.Open) {
			await connection.Value.SendAsync(Encoding.UTF8.GetBytes(messageObj!.message.ToString()),
				WebSocketMessageType.Text, true, CancellationToken.None);
		}
	}
} */

private async Task CloseClientAsync(string connectionId) 
{
	if (!_manager.GetAllConnections().TryRemove(connectionId, out WebSocket _connection)) {
		Console.Error.Write($"Connection id: {connectionId} not found in manager.");
		return;
	}

	await _connection.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
	Console.WriteLine($"Connection from {connectionId} closed...");
	return;
}

/*// Send connection id to client  
private async Task SendConnIdAsync(WebSocket socket, string connId) 
{
	var buffer = Encoding.UTF8.GetBytes($"ConnId: {connId}");
	await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
} */
  }
}