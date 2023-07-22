/* eslint-disable @typescript-eslint/no-unused-vars */
import { NAMES } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import ChatsAPI from "services/api/chats-api";
import store from "services/store";
import ValidationMediator from "services/validation/validation-mediator";

import FormField from "components/FormField";

import ModalController from "./modal-controller";

class ChatController {
  private _validation: ValidationMediator;

  constructor() {
    this._validation = new ValidationMediator(FORM_TYPE.CHATS);
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
            userName: chat.last_message?.user?.first_name,
            content: chat.last_message?.content,
            time: chat.last_message?.time,
          },
        }));

      store.set("chats", convertData());
    } catch (e) {
      console.error(e);
    }
  };

  public createChat = () => {
    const handleSubmitClick = async () => {
      const chatName = this.validation.getFieldValue(NAMES.createChat);
      const response = await ChatsAPI.createChat(chatName ?? "new chat");

      if (response.status === 200) {
        await this.fetchChats();

        ModalController.hideModal();
      }
    };

    ModalController.createModal({
      title: "Создать чат",
      content: new FormField({
        fieldName: NAMES.createChat,
        validation: this.validation,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Создать",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  };
}

export default new ChatController();
