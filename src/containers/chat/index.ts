import ChatBar from "./chatBarSection";
import MessageSection from "./messageSection";

import template from "./chat.hbs";
import { Chat_data, Chat_details_data } from "../../types/chat";

interface Props {
  chats: Chat_data[];
  currentChat: Chat_details_data;
}

const Chat = ({ chats, currentChat }: Props) => {
  return template({
    chatBar: ChatBar({ chats }),
    chatMessages: MessageSection({ currentChat }),
  });
};

export default Chat;
