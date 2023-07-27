import { IDS, NAMES, PLACEHOLDERS } from "constants/fields";
import SubmitIcon from "icons/arrow-right.svg";
import AttachIcon from "icons/attach-icon.svg";
import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";

import IconButton from "components/IconButton";
import MessageInputArea from "components/MessageTextArea";

import template from "./Footer.hbs";

type Props = {
  savedMessage?: Nullable<string>;
  validation: ValidationMediator;
};

class Footer extends Block<Props> {
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

export default Footer;
