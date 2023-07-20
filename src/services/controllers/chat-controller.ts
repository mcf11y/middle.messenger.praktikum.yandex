/* eslint-disable @typescript-eslint/no-unused-vars */
import FORM_TYPE from "constants/form-types";
import ChatsAPI from "services/api/chats-api";
import store from "services/store";
import ValidationMediator from "services/validation/validation-mediator";

import ModalController from "./modal-controller";

class ChatController {
  private _validation: ValidationMediator;

  constructor() {
    this._validation = new ValidationMediator(FORM_TYPE.CHAT_MESSAGE);
  }

  public get validation() {
    return this._validation;
  }

  public fetchChats = async () => {
    try {
      const response = await ChatsAPI.getChats();

      if (response.status !== 200) {
        throw new Error("Cant fetch chats");
      }

      const convertData = () =>
        response.data.map((chat) => ({
          id: chat.id,
          name: chat.title,
          avatar: chat.avatar,
          unreadCount: chat.unread_count,
          lastMesage: {
            userName: chat.last_message.user.first_name,
            content: chat.last_message.content,
            time: chat.last_message.time,
          },
        }));

      store.set("chats", convertData());
    } catch (e) {
      console.error(e);
    }
  };

  public createChat = () => {
    //const handleSubmitClick = async () => {
      // const chatName = document.getElementById("#create-chat-modal")?.textContent;
      // const response = await ChatsAPI.createChat(chatName ?? "new chat");
      // if (response.status === 200) {
      //   // ModalController.destroy();
      //   await this.fetchChats();
      // }
    // };

    // eslint-disable-next-line no-debugger
    debugger;

    ModalController.setModalContent({
      title: "Создать чат",
      submitBtnText: "Создать",
    });
  };
}

export default new ChatController();
