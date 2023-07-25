import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";
import { ChatData } from "types/chat";

import EmptyMessage from "./MessageSection/EmptyMessage";
import template from "./Chat.hbs";
import ChatBar from "./ChatBarSection";
import MessageSection from "./MessageSection";

type Props = {
  chats: ChatData[];
  currentChatId?: number;
  validation: ValidationMediator;
};

class Chat extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { chats, currentChatId } = this.props as Props;

    const currentChat = chats?.find((chat) => +chat.id === currentChatId);

    this.children.chatBar = new ChatBar({ chats, currentChatId });
    this.children.chatMessages = currentChat
      ? new MessageSection({
        currentChat,
        validation: this.props.validation,
      })
      : new EmptyMessage();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Chat;
