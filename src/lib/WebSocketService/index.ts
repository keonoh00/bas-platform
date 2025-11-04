export type WebSocketMessageMap = {
  notification: {
    message: string;
    type?: "info" | "success" | "error" | "warning";
    duration?: number;
  };
  trigger: {
    pid: string;
    host: string;
  };
};

type MessageType = keyof WebSocketMessageMap;
type MessageHandler<T extends MessageType> = (
  payload: WebSocketMessageMap[T]
) => void;

class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;

  private listeners: {
    [K in MessageType]: Set<MessageHandler<K>>;
  } = {
    notification: new Set(),
    trigger: new Set(),
  };

  private constructor() {}

  private initializeSocket() {
    if (this.socket) return;

    if (typeof window === "undefined") return;

    const ws = new WebSocket(`ws://${window.location.hostname}:3002`);

    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.warn("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error", err);

    ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        const { type, ...payload } = raw;

        if (type in this.listeners) {
          this.emit(type as MessageType, payload);
        }
      } catch (e) {
        console.error("Invalid WebSocket message:", event.data, e);
      }
    };

    this.socket = ws;
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
      WebSocketService.instance.initializeSocket();
    }
    return WebSocketService.instance;
  }

  on<T extends MessageType>(type: T, handler: MessageHandler<T>) {
    this.listeners[type].add(handler);
  }

  off<T extends MessageType>(type: T, handler: MessageHandler<T>) {
    this.listeners[type].delete(handler);
  }

  private emit<T extends MessageType>(type: T, payload: unknown) {
    const handlers = this.listeners[type];
    handlers.forEach((handler) => {
      handler(payload as WebSocketMessageMap[T]);
    });
  }
}

export const ws = WebSocketService.getInstance();
