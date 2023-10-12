using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace webapi.Middleware 
{
  public class WebSocketConnectionManager 
  {
	private ConcurrentDictionary<string, WebSocket> _connections = new();
	public ConcurrentDictionary<string, WebSocket> GetAllConnections() => _connections;

	public string AddConnection(WebSocket connection) 
	{
		string connectionId = Guid.NewGuid().ToString();
		_connections.TryAdd(connectionId, connection);
		return connectionId;
	}
  }
}