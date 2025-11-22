interface WebSocketData {
  ear?: number;
  state?: string;
  active_agent?: string;
  timestamp?: string;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private onStateUpdate: ((data: WebSocketData) => void) | null = null;
  private onConnectionChange: ((connected: boolean) => void) | null = null;

  connect(url: string) {
    try {
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.onConnectionChange?.(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const data: WebSocketData = JSON.parse(event.data);
          this.onStateUpdate?.(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.onConnectionChange?.(false);
        this.handleReconnect(url);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.onConnectionChange?.(false);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.handleReconnect(url);
    }
  }

  private handleReconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(url);
      }, delay);
    } else {
      console.warn('Max reconnection attempts reached. Backend may not be running.');
      // Reset attempts after 30 seconds for potential recovery
      setTimeout(() => {
        this.reconnectAttempts = 0;
        console.log('Retrying connection...');
        this.connect(url);
      }, 30000);
    }
  }

  setOnStateUpdate(callback: (data: WebSocketData) => void) {
    this.onStateUpdate = callback;
  }

  setOnConnectionChange(callback: (connected: boolean) => void) {
    this.onConnectionChange = callback;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsClient = new WebSocketClient();