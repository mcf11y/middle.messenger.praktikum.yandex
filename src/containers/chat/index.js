import ChatBar from "./chatBarSection";
import MessageSection from "./messageSection";

import template from "./chat.hbs";

const Chat = ({ chatsData, currentChat }) => {
  return template({
    chatBar: ChatBar({ chats: chatsData }),
    chatMessages: MessageSection({ currentChat }),
  });
};

export default Chat;
