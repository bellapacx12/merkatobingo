class WebSocketService {
  private socket: WebSocket | null = null;

  connect(roomId: string) {
    this.socket = new WebSocket(`wss://your-backend-url/ws/${roomId}`);

    this.socket.onopen = () => {
      console.log("Connected to room:", roomId);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);
    };
  }

  send(message: any) {
    this.socket?.send(JSON.stringify(message));
  }

  disconnect() {
    this.socket?.close();
  }
}

export default new WebSocketService();
