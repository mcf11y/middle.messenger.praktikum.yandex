import Block from "services/block";

import template from "./ChatMessage.hbs";

type Props = {
  message: string;
  time: string;
  my: boolean;
};

class ChatMessage extends Block {
  constructor({ message, time, my }: Props) {
    super({
      message,
      time,
      color: my ? "blue" : "gray",
      position: my ? "right" : "left",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatMessage;
