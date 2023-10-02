import EventBus from "@/services/utils/event-bus";

export enum EWSTransportEvents {
  OPEN = "open",
  MESSAGE = "message",
  ERROR = "error",
  CONNECTED = "connected",
  CLOSE = "close",
}

export type WSResponse = {
  content: string | object;
  id?: number;
  time?: string;
  type: string;
  user_id?: number;
};

// type EventTypes<T> = {
//   [EWSTransportEvents.OPEN]: [void];
//   [EWSTransportEvents.MESSAGE]: [T];
//   [EWSTransportEvents.ERROR]: [unknown];
//   [EWSTransportEvents.CONNECTED]: [void];
//   [EWSTransportEvents.CLOSE]: [void];
// };

class WSTransport extends EventBus {
  private socket?: WebSocket;
  private pingInterval: Maybe<ReturnType<typeof setInterval>>;
  private readonly pingIntervalTime = 30000;
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send({ data, type }: { data?: string | number | object; type: string }) {
    if (!this.socket) {
      throw new Error("Socket is not conntected");
    }

    this.socket.send(
      JSON.stringify({
        type,
        content: data,
      })
    );
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error("The socket is already connected");
    }

    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(EWSTransportEvents.ERROR, reject);

      this.on(EWSTransportEvents.CONNECTED, () => {
        this.off(EWSTransportEvents.ERROR, reject);

        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, this.pingIntervalTime);

    this.on(EWSTransportEvents.CLOSE, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener(EWSTransportEvents.OPEN, () => {
      this.emit(EWSTransportEvents.CONNECTED);
    });

    socket.addEventListener(EWSTransportEvents.CLOSE, () => {
      this.emit(EWSTransportEvents.CLOSE);
    });

    socket.addEventListener(EWSTransportEvents.ERROR, (e) =>
      this.emit(EWSTransportEvents.ERROR, e)
    );

    socket.addEventListener(
      EWSTransportEvents.MESSAGE,
      (message: MessageEvent<any>) => {
        try {
          const data = JSON.parse(message.data);

          if (["pong", "user connected"].includes(data?.type)) {
            return;
          }

          this.emit(EWSTransportEvents.MESSAGE, data);
        } catch (e) {
          console.error(e);
        }
      }
    );
  }
}

export default WSTransport;
