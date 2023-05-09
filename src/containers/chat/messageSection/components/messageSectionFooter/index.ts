import Block from "utils/Block";
import MessageInputArea from "components/messageTextArea";

import IconButton from "components/iconButton";
import template from "./messageSectionFooter.hbs";

import AttachIcon from "../../../../../../static/icons/attach-icon.svg";
import SubmitIcon from "../../../../../../static/icons/arrow-right.svg";

type Props = {
  savedMessage?: Nullable<string>;
};

class MessageSectionFooter extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init(): void {
    this.children.attachButton = new IconButton({
      iconSrc: AttachIcon,
      variant: "secondary",
      btnWidth: 35,
      iconWidth: 20,
    });
    this.children.inputArea = new MessageInputArea({
      savedMessage: this.props.savedMessage,
      name: "message",
      placeholder: "Сообщение",
      onBlur: this.validateMessageArea.bind(this),
      onFocus: this.validateMessageArea.bind(this),
      onChange: this.validateMessageArea.bind(this),
    });
    this.children.submitButton = new IconButton({
      iconSrc: SubmitIcon,
    });
  }

  public validateMessageArea(): void {
    const error = (this.children.inputArea as MessageInputArea).validate();

    if (error !== "") {
      (this.children.submitButton as IconButton).disabled();
    } else {
      (this.children.submitButton as IconButton).enabled();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageSectionFooter;
