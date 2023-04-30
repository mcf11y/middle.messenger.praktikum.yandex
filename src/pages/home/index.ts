import SignUp from "../signup";

import Chat from "../../containers/chat";

import {CHAT_LIST, CURRENT_CHAT} from "./mock.const";

const Home = () => {
  const isLogin = true;

  if (!isLogin) {
    return SignUp();
  }

  return Chat({
    chats: CHAT_LIST,
    currentChat: CURRENT_CHAT,
  });
};

export default Home;
