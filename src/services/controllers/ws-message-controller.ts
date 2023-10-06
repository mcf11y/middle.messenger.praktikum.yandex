import { NAMES } from "constants/fields";
import FormMediator from "services/form-mediator/form-mediator";
import store from "services/store";
import WSTransport from "services/ws-transport";
import { EWSTransportEvents, WSResponse } from "services/ws-transport/ws-transport";
import { MessageData } from "types/chat";

import { isSystemMessage } from "./chat-controller";

const WS_CHAT_URL = "wss://ya-praktikum.tech/ws/chats/";

export type TokensMap = Record<ID, string>;
export type SocketsMap = Record<ID, WSMessageController>;

class WSMessageController {
  private wSTransport: WSTransport;
  private chatId: string | number;
  private userId: string | number;
  // @ts-ignore
  private activeChatId?: string | number;

  constructor(chatId: ID, chatToken?: string) {
    this.chatId = chatId;
    const token = chatToken || (store.getState()?.chatTokens as any)?.[chatId];
    this.userId = (store.getState()?.user as any)?.id;
    // this.activeChatId = store.getState().activeChat?.id;

    if (!token) {
      throw new Error("Cant get token for chat!");
    }

    if (!this.userId) {
      throw new Error("Cant get user");
    }

    this.wSTransport = new WSTransport(
      `${WS_CHAT_URL}/${this.userId}/${chatId}/${token}`
    );

    this.wSTransport.on(EWSTransportEvents.MESSAGE, this.receiveMessage.bind(this));
  }

  public async connect() {
    return this.wSTransport.connect();
  }

  public disconnect() {
    this.wSTransport.off(EWSTransportEvents.MESSAGE, this.receiveMessage);
    this.wSTransport.close();
  }

  public getOldMessages(start: number) {
    this.wSTransport.send({ data: start, type: "get old" });
  }

  public sendMessage(formMediator: FormMediator) {
    const value = formMediator.getFieldValue(NAMES.message);
    this.wSTransport.send({ data: value, type: "message" });
    formMediator.clearField(NAMES.message);
  }

  public receiveMessage(response: WSResponse | WSResponse[]) {
    const userId = this.userId;

    const setData = (_response: WSResponse) => {
      // todo для других видом данных нужна другая проверка
      // if (typeof response.content === "string" && response.content?.type !== "ping") {

      if (
        typeof _response?.content === "string" &&
        !isSystemMessage(_response.content)
      ) {
        const messageData: MessageData = {
          contentType: "text",
          content: _response.content,
          time: _response?.time,
          my: userId === _response.user_id,
        };

        // todo пока что храним только сообщение активного чата
        store.set(`chatMessages.${this.chatId}.${_response.id}`, messageData);
      }
    };

    if (Array.isArray(response)) {
      for (let i = response.length - 1; i > 0; i--) {
        setData(response[i]);
      }
    } else {
      setData(response);
    }
  }
}

export default WSMessageController;
