import store from "services/store";
import WSTransport from "services/ws-transport";
import { EWSTransportEvents } from "services/ws-transport/ws-transport";

const WS_CHAT_URL = "wss://ya-praktikum.tech/ws/chats/";

class MessageController {
  private wSTransport: WSTransport;
  private onRecieve: (message: any) => void;

  constructor(chatId: number, onRecieveMessage: (message: any) => void) {
    const token = store.getState()[chatId];
    const userId = (store.getState()?.user as any).id;

    if (!token) {
      throw new Error("Cant get token for chat!");
    }

    if (!userId) {
      throw new Error("Cant get user");
    }

    this.wSTransport = new WSTransport(
      `${WS_CHAT_URL}/${userId}/${chatId}/${token}`
    );

    this.onRecieve = onRecieveMessage;
    this.wSTransport.on(EWSTransportEvents.MESSAGE, onRecieveMessage);
  }

  public connect() {
    this.wSTransport.connect();
  }

  public disconnect() {
    this.wSTransport.off(EWSTransportEvents.MESSAGE, this.onRecieve);
    this.wSTransport.close();
  }

  public sendMessage(data: string | number | object) {
    this.wSTransport.send(data);
  }
}

export default MessageController;
