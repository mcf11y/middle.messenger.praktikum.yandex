import Block from "services/block";

import Badge from "components/Badge";
import Title from "components/Title";

import template from "./chatBarItem.hbs";

type Props = {
  id?: string | number;
  avatar: Block;
  chatName: string;
  lastMessage?: string;
  time: string;
  missedMesssageCount?: number;
  selected?: boolean;
  onClick: (id: string | number) => void;
};

class ChatBarItem extends Block {
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

    this.props.events = {
      click: () => {
        this.props.onClick(this.props.id);
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
    });
  }
}

export default ChatBarItem;
