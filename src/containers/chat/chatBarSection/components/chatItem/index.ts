import Title from "components/title";
import Badge from "components/badge";

import Block from "base-component";
import template from "./chatItem.hbs";

type Props = {
  id?: string | number;
  avatar: Block;
  chatName: string;
  lastMessage?: string;
  time: string;
  missedMesssageCount?: number;
};

class ChatItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected init() {
    this.children.chatTitle = new Title({
      text: this.props.chatName,
      size: "xs",
    });

    if (this.props.missedMesssageCount) {
      this.children.countBadge = new Badge({ text: this.props.missedMesssageCount });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatItem;
