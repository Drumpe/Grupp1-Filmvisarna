using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace webapi.Middleware
{
    public class SeatStatusFeedMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly WebSocketConnectionManager _manager;
        private static List<string> _allowedOrigins = new List<string> {
        "http://localhost:5173",
        "https://localhost:5173"
        };

        public SeatStatusFeedMiddleware(RequestDelegate next, WebSocketConnectionManager manager)
        {
            _next = next;
            _manager = manager;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _next(context);
            }

            if (context.WebSockets.IsWebSocketRequest)
            {
                if (_allowedOrigins.Contains(context.Request.Headers.Origin))
                {
                    await AcceptAsync(context);
                }
                else
                {
                    context.Response.StatusCode = 403;
                    return;
                }
            }
        }

        public async Task AcceptAsync(HttpContext context)
        {
            WebSocket connection = await context.WebSockets.AcceptWebSocketAsync();
            string connectionId = _manager.AddConnection(connection);

            Console.WriteLine($"Connection from ${connectionId} established...");

            await SendReadyAsync(connection);

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
                        JsonElement screeningId;

                        if (!message!.RootElement.TryGetProperty("status", out status))
                        {
                            await CloseClientAsync(connectionId);
                            return;
                        }

                        if (!message!.RootElement.TryGetProperty("screeningId", out screeningId))
                        {
                            await CloseClientAsync(connectionId);
                            return;
                        }

                        if (status.ToString() == "book")
                        {
                            await BroadcastAsync(message.ToString());
                        }

                        if (status.ToString() == "screening")
                        {
                            if (_manager.AddScreeningId(connectionId, screeningId.ToString()))
                            {
                                Console.WriteLine($"{screeningId.ToString()} added to connection {connectionId}");
                            }
                        }
                    }
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    Console.WriteLine($"Closing request from {connectionId} recieved.");
                    if (!_manager.GetAllConnections().TryRemove(connectionId, out WebSocket _connection))
                    {
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

        private async Task BroadcastAsync(string message)
        {
            foreach (var connection in _manager.GetAllConnections())
            {
                if (connection.Value.State == WebSocketState.Open)
                {
                    await connection.Value.SendAsync(Encoding.UTF8.GetBytes(message),
                        WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }

        private async Task BroadcastToScreeningAsync(string message, string screeningId)
        {
            foreach (var connection in _manager.GetAllConnections())
            {
                if (_manager.GetScreeningId(connection.Key) == screeningId)
                {
                    await connection.Value.SendAsync(Encoding.UTF8.GetBytes(message),
                        WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }

        private async Task CloseClientAsync(string connectionId)
        {
            if (!_manager.GetAllConnections().TryRemove(connectionId, out WebSocket _connection))
            {
                Console.Error.Write($"Connection id: {connectionId} not found in manager.");
                return;
            }

            await _connection.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
            Console.WriteLine($"Connection from {connectionId} closed by server...");
            return;
        }

        // Send screeningId to client
        private async Task SendReadyAsync(WebSocket socket)
        {
            var status = new { status = "ready" };
            var message = JsonSerializer.Serialize(status, new JsonSerializerOptions { WriteIndented = true });
            var buffer = Encoding.UTF8.GetBytes(message);
            await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}