import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";
import { ChatDetailsData } from "types/chat";

import Divider from "components/Divider";

import template from "./MessageSection.hbs";
import Content from "./MessageSectionContent";
import Footer from "./MessageSectionFooter";
import Header from "./MessageSectionHeader";

type Props = {
  currentChat: ChatDetailsData;
  validation: ValidationMediator;
};

class ChatMessages extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { chatName, messages, myDraftMessage } = this.props.currentChat;

    this.children.header = new Header({ chatName });

    this.children.topDivider = new Divider();

    this.children.content = new Content({ messages });

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
