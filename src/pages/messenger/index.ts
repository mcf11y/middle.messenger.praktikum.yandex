import FORM_TYPE from "constants/form-types";
import Chat from "containers/Chat";
import ValidationMediator from "services/validation/validation-mediator";

import { CHAT_LIST, CURRENT_CHAT } from "./mock.const";

const chatValidation = new ValidationMediator(FORM_TYPE.CHAT_MESSAGE);

const Messenger = () =>
  new Chat({
    chats: CHAT_LIST,
    currentChat: CURRENT_CHAT,
    validation: chatValidation,
  });

export default Messenger;
