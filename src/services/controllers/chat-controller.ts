import { NAMES } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import ChatsAPI from "services/api/chats-api";
import UserAPI from "services/api/user-api";
import store from "services/store";
import ValidationMediator from "services/validation/validation-mediator";

import AvatarFormInput from "components/AvatarFormInput";
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

  public deleteChat = (chatId: number) => {
    const handleSubmitClick = async () => {
      const response = await ChatsAPI.deleteChatById(chatId);

      if (response.status === 200) {
        await this.fetchChats();

        ModalController.hideModal();
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

  public async updateAvatar(chatId: number) {
    const handleSubmit = async (e: SubmitEvent) => {
      // const avatarForm = document.getElementById("avatar-form-input");

      const form = new FormData(e.target as any);
      form.append("chatId", chatId.toString());

      const response = await ChatsAPI.updateAvatar(form);

      if (response.status === 200) {
        this.fetchChats();

        ModalController.hideModal();
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

  public addUser(chatId: number) {
    const handleSubmitClick = async () => {
      const userLogin = this.validation.getFieldValue(NAMES.login);

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
        this.validation.setFieldErrorMessage(NAMES.login, e);
      }
    };

    ModalController.createModal({
      title: "Добавить пользователя",

      content: new FormField({
        fieldName: NAMES.login,
        validation: this.validation,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Добавить",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  }

  public deleteUser(chatId: number) {
    const handleSubmitClick = async () => {
      const userLogin = this.validation.getFieldValue(NAMES.login);

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
        this.validation.setFieldErrorMessage(NAMES.login, e);
      }
    };

    ModalController.createModal({
      title: "Удадить пользователя",

      content: new FormField({
        fieldName: NAMES.login,
        validation: this.validation,
      }),
      hasSubmitBtn: true,
      submitBtnText: "Удалить",
      onSubmit: handleSubmitClick,
      onClose: () => ModalController.hideModal(),
    });

    ModalController.showModal();
  }
}

export default new ChatController();
