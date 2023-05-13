import { ChatData, ChatDetailsData } from "types/chat";
import Block from "utils/Block";
import ChatBar from "./chatBarSection";
import MessageSection from "./messageSection";

import template from "./chat.hbs";
import EmptyMessage from "./messageSection/components/emptyMessageSection";

type Props = {
  chats: ChatData[];
  currentChat?: ChatDetailsData;
};

class Chat extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { chats, currentChat } = this.props;

    this.children.chatBar = new ChatBar({ chats });
    this.children.chatMessages = currentChat
      ? new MessageSection({ currentChat })
      : new EmptyMessage();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Chat;
