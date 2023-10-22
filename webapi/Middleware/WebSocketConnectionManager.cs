using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace webapi.Middleware
{
    public class WebSocketConnectionManager
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new();
        private ConcurrentDictionary<string, string> _screeningIds = new();
        public ConcurrentDictionary<string, WebSocket> GetAllConnections() => _connections;
        public ConcurrentDictionary<string, string> GetAllScreeningIds() => _screeningIds;

        public string AddConnection(WebSocket connection)
        {
            string connectionId = Guid.NewGuid().ToString();
            _connections.TryAdd(connectionId, connection);
            return connectionId;
        }

        public bool AddScreeningId(string guid, string screeningId)
        {
            WebSocket _socket;
            if (!_connections.TryGetValue(guid, out _socket))
                return false;

            if (_screeningIds.TryAdd(guid, screeningId))
                return true;

            return false;
        }
    }
}