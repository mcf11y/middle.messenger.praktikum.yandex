import Chat from "containers/chat";
import SignUp from "pages/signup";

import ValidationMediator from "services/validation/ValidationMediator";
import FORM_TYPE from "constants/formTypes";
import { CHAT_LIST, CURRENT_CHAT } from "./mock.const";

const chatValidation = new ValidationMediator(FORM_TYPE.CHAT_MESSAGE);

const Messenger = () => {
  const isLogin = true;

  if (!isLogin) {
    return SignUp();
  }

  return new Chat({
    chats: CHAT_LIST,
    currentChat: CURRENT_CHAT,
    validation: chatValidation,
  });
};

export default Messenger;
