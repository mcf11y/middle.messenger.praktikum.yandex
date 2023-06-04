import Block from "base-component";
import MessageInputArea from "components/messageTextArea";

import IconButton from "components/iconButton";
import ValidationMediator from "validation/ValidationMediator";
import { IDS, NAMES, PLACEHOLDERS } from "constants/fields";
import template from "./messageSectionFooter.hbs";

import AttachIcon from "../../../../../../static/icons/attach-icon.svg";
import SubmitIcon from "../../../../../../static/icons/arrow-right.svg";


type Props = {
  savedMessage?: Nullable<string>;
  validation: ValidationMediator;
};

class MessageSectionFooter extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init(): void {
    const fName = NAMES.message;

    this.props.validation?.subscribeField(fName);

    this.children.attachButton = new IconButton({
      iconSrc: AttachIcon,
      variant: "secondary",
      btnWidth: 30,
      iconWidth: 20,
    });

    this.children.inputArea = new MessageInputArea({
      id: IDS[fName],
      name: fName,
      savedMessage: this.props.savedMessage,
      placeholder: PLACEHOLDERS[fName],

      onBlur: () => this.props.validation.validateField(fName),
      onFocus: () => this.props.validation.validateField(fName),
      onInput: () => this.props.validation.validateField(fName),
    });

    this.children.submitButton = new IconButton({
      id: IDS[NAMES.submitBtn],
      iconSrc: SubmitIcon,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageSectionFooter;
