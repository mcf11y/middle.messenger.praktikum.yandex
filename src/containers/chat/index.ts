import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";
import { ChatData, ChatDetailsData } from "types/chat";

import EmptyMessage from "./MessageSection/EmptyMessageSection";
import template from "./Chat.hbs";
import ChatBar from "./ChatBarSection";
import MessageSection from "./MessageSection";

type Props = {
  chats: ChatData[];
  currentChat?: ChatDetailsData;
  validation: ValidationMediator;
};

class Chat extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { chats, currentChat } = this.props;

    this.children.chatBar = new ChatBar({ chats });
    this.children.chatMessages = currentChat
      ? new MessageSection({ currentChat, validation: this.props.validation })
      : new EmptyMessage();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Chat;
