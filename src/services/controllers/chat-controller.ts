import { NAMES } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import ChatsAPI from "services/api/chats-api";
import UserAPI from "services/api/user-api";
import FormMediator from "services/form-mediator/form-mediator";
import store from "services/store";
import { ChatData } from "types/chat";

import AvatarFormInput from "components/AvatarFormInput";
import FormField from "components/FormField";

import ModalController from "./modal-controller";

export const isSystemMessage = (content?: string) => {
  if (!content) return false;

  try {
    return JSON.parse(content)?.type === "ping";
  } catch (e) {
    return false;
  }
};

class ChatController {
  private _validation: FormMediator;

  constructor() {
    this._validation = new FormMediator(FORM_TYPE.CHATS);
  }

  public get formMediator() {
    return this._validation;
  }

  public fetchChats = async () => {
    try {
      const response = await ChatsAPI.getChats();

      if (response.status !== 200) {
        throw new Error("Cant fetch chats");
      }

      const convertData = () =>
        response.data.map((chat) => {
          this.fetchChatToken(+chat.id);

          return {
            id: chat.id,
            name: chat.title,
            avatar: chat.avatar,
            unreadCount: chat.unread_count,
            lastMesage: isSystemMessage(chat.last_message?.content)
              ? undefined
              : {
                  userName: chat.last_message?.user?.first_name,
                  content: chat.last_message?.content,
                  time: chat.last_message?.time,
                },
          };
        });

      store.set("chats", convertData());
    } catch (e) {
      console.error(e);
    }
  };

  public createChat = () => {
    const handleSubmitClick = async () => {
      const chatName = this.formMediator.getFieldValue(NAMES.createChat);
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
        formMediator: this.formMediator,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Создать",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  };

  public setActiveChat = (chat: ChatData) => {
    // store.set("activeChatId", chatId);
    store.set("activeChat", chat);
  };

  public clearActiveChat = () => {
    // store.remove("activeChatId");
    store.remove("activeChat");
  };

  public deleteChat = (chatId: ID) => {
    const handleSubmitClick = async () => {
      const response = await ChatsAPI.deleteChatById(chatId);

      if (response.status === 200) {
        await this.fetchChats();

        ModalController.hideModal();

        this.closeSocket(chatId);
        this.clearActiveChat();
        this.deleteChatToken(chatId);

        // ws off
      }
    };

    ModalController.createModal({
      title: "Удалить чат",

      hasSubmitBtn: true,
      submitBtnText: "Удалить",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  };

  public async updateAvatar(chatId: ID) {
    const handleSubmit = async (e: SubmitEvent) => {
      // const avatarForm = document.getElementById("avatar-form-input");

      const form = new FormData(e.target as any);
      form.append("chatId", chatId.toString());

      const response = await ChatsAPI.updateAvatar(form);

      if (response.status === 200) {
        this.fetchChats();

        ModalController.hideModal();

        this.setActiveChat(response.data as any);
      }
    };

    ModalController.createModal({
      title: "Загрузить файл",
      content: new AvatarFormInput({
        onSubmit: handleSubmit,
      }),
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  }

  public addUser(chatId: ID) {
    const handleSubmitClick = async () => {
      const userLogin = this.formMediator.getFieldValue(NAMES.login);

      try {
        const users = await UserAPI.findUsersByLogin(userLogin);
        if (!users.data.length || !users.data.length) {
          throw new Error("Users not found");
        }

        ChatsAPI.addUsers({
          users: users.data.map((user) => user.id),
          chatId,
        }).then((reponse) => {
          reponse.status === 200 &&
            this.fetchChats().then(() => ModalController.hideModal());
        });
      } catch (e) {
        this.formMediator.setFieldErrorMessage(NAMES.login, e);
      }
    };

    ModalController.createModal({
      title: "Добавить пользователя",

      content: new FormField({
        fieldName: NAMES.login,
        formMediator: this.formMediator,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Добавить",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  }

  public deleteUser(chatId: ID) {
    const handleSubmitClick = async () => {
      const userLogin = this.formMediator.getFieldValue(NAMES.login);

      try {
        const users = await UserAPI.findUsersByLogin(userLogin);
        if (!users.data.length || !users.data.length) {
          throw new Error("Users not found");
        }

        ChatsAPI.deteleUsers({
          users: users.data.map((user) => user.id),
          chatId,
        }).then((reponse) => {
          reponse.status === 200 &&
            this.fetchChats().then(() => ModalController.hideModal());
        });
      } catch (e) {
        this.formMediator.setFieldErrorMessage(NAMES.login, e);
      }
    };

    ModalController.createModal({
      title: "Удадить пользователя",

      content: new FormField({
        fieldName: NAMES.login,
        formMediator: this.formMediator,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Удалить",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  }

  public deleteChatToken(chatId: ID) {
    store.remove(`chatTokens.${chatId}`);
  }

  public closeSocket(chatId: ID) {
    const path = `chatSocket.${chatId}`;

    (store.getState()[path] as any)?.disconnect();
    store.remove(path);
  }

  public async fetchChatToken(chatId: ID) {
    ChatsAPI.getChatToken(chatId).then((response) => {
      if (response.status === 200) {
        store.set(`chatTokens.${chatId}`, response.data.token);
      }
    });
  }
}

export default new ChatController();
