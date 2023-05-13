import Chat from "containers/chat";
import SignUp from "pages/signup";

import { CHAT_LIST, CURRENT_CHAT } from "./mock.const";

const Home = () => {
  const isLogin = true;

  if (!isLogin) {
    return SignUp();
  }

  return new Chat({
    chats: CHAT_LIST,
    currentChat: CURRENT_CHAT,
  });
};

export default Home;
