import { ChatData, ChatDetailsData } from "types/chat";
import ChatBar from "./chatBarSection";
import MessageSection from "./messageSection";

import template from "./chat.hbs";

type Props = {
  chats: ChatData[];
  currentChat: ChatDetailsData;
};

const Chat = ({ chats, currentChat }: Props) =>
  template({
    chatBar: ChatBar({ chats }),
    chatMessages: MessageSection({ currentChat }),
  });

export default Chat;
