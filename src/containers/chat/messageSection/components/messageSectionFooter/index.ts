import Block from "utils/Block";
import MessageInputArea from "../../../../../components/messageTextArea";

import template from "./messageSectionFooter.hbs";

type Props = {
  attachButton: Block;
  savedMessage?: Nullable<string>;
  submitButton: Block;
};

class MessageSectionFooter extends Block {
  constructor(props: Props) {
    console.log(props);
    super({
      ...props,
    });
  }

  protected init() {
    this.children.inputArea = new MessageInputArea({
      savedMessage: this.props.savedMessage,
      name: "message",
      placeholder: "Сообщение",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageSectionFooter;
