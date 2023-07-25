import { RESOURCE_URL } from "constants/urls";
import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";
import { ChatData } from "types/chat";

import Divider from "components/Divider";

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import template from "./MessageSection.hbs";

type Props = {
  currentChat: ChatData;
  validation: ValidationMediator;
};

class ChatMessages extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { id, name, avatar, messages, myDraftMessage } = this.props.currentChat;

    this.children.header = new Header({
      chatId: id,
      chatName: name,
      avatarSrc: avatar ? RESOURCE_URL + avatar : undefined,
    });

    this.children.topDivider = new Divider();

    if (messages) {
      this.children.content = new Content({ messages });
    }

    this.children.bottomDivider = new Divider();

    this.children.footer = new Footer({
      validation: this.props.validation,

      savedMessage:
        myDraftMessage != null && myDraftMessage.contentType === "text"
          ? myDraftMessage.content.toString()
          : undefined,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatMessages;
