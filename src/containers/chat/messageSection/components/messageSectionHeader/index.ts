import Block from "utils/Block";
import Avatar from "../../../../../components/avatar";
import Title from "../../../../../components/title";

import template from "./messageSectionHeader.hbs";

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
