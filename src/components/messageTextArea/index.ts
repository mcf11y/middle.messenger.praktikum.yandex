import Block from "utils/Block";
import template from "./messageTextArea.hbs";

type Props = {
  savedMessage?: Nullable<string>;
  name: string;
  placeholder: string;
};

class MessageInputArea extends Block {
  constructor({ savedMessage, name, placeholder = "" }: Props) {
    super({
      savedMessage,
      name,
      placeholder,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageInputArea;
