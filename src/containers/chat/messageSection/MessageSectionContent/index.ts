import Block from "services/block";
import { MessageData } from "types/chat";

import ChatMessage from "components/ChatMessage";

import template from "./MessageSectionContent.hbs";

type Props = {
  id?: string;
  messages: MessageData[];
};

class MessageSectionContent extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  private renderMessages(messages: MessageData[]) {
    return messages.map(
      ({ contentType, content, time, my }) =>
        new ChatMessage({
          message: contentType === "text" ? (content as string) : "",
          time: time.toString(),
          my,
        })
    );
  }

  protected init() {
    this.children.messagesList = this.renderMessages(this.props.messages);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageSectionContent;