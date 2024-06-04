import io from 'socket.io-client';

let socket = null;
const CONNECT_EVENT = 'connect';
const DISCONNECT_EVENT = 'disconnect';
const RECONNECT_EVENT = 'reconnect';
const HEARTBEAT_EVENT = 'heartbeat';

// 封装websocket连接对象，包含重连和心跳功能
function createSocket(url, options) {
  if (!socket) {
    socket = io(url, options);
    socket.on(CONNECT_EVENT, () => {
      console.log('WebSocket connected');
    });
    socket.on(DISCONNECT_EVENT, () => {
      console.warn('WebSocket disconnected');
    });
    socket.on(RECONNECT_EVENT, () => {
      console.log('WebSocket reconnected');
    });
    socket.on(HEARTBEAT_EVENT, () => {
      console.log('WebSocket heartbeat received');
    });
  }
  return socket;
}

export default createSocket;