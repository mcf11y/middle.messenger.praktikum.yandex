import Block from "services/block";

import Avatar from "components/Avatar";
import Title from "components/Title";

import template from "./MessageSectionHeader.hbs";

type Props = {
  avatarImg?: string;
  chatName: string;
};

class MessageSectionHeader extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    this.children.avatar = new Avatar({ size: "s", imageSrc: this.props.avatarImg });
    this.children.title = new Title({ text: this.props.chatName, size: "s" });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageSectionHeader;
