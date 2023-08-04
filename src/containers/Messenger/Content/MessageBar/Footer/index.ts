import { IDS, NAMES, PLACEHOLDERS } from "constants/fields";
import SubmitIcon from "icons/arrow-right.svg";
import AttachIcon from "icons/attach-icon.svg";
import Block from "services/block";
import FormMediator from "services/form-mediator/form-mediator";

import IconButton from "components/IconButton";
import MessageInputArea from "components/MessageTextArea";

import template from "./Footer.hbs";

type Props = {
  savedMessage?: Nullable<string>;
  formMediator: FormMediator;
  onSubmit?: () => void;
};

class Footer extends Block<Props> {
  protected init(): void {
    const fName = NAMES.message;

    this.props.formMediator?.subscribeToValidate(fName);

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

      onBlur: () => this.props.formMediator.validateField(fName),
      onFocus: () => this.props.formMediator.validateField(fName),
      onInput: () => this.props.formMediator.validateField(fName),
    });

    this.children.inputArea
      .getContent()
      ?.addEventListener("keypress", (e: KeyboardEvent) => {
        if (
          e.keyCode == 13 &&
          !e.shiftKey &&
          this.props.formMediator.isFormValid()
        ) {
          e.preventDefault();
          this.props.formMediator.isFormValid();
          this.props.onSubmit?.();
        }
      });

    this.children.submitButton = new IconButton({
      id: IDS[NAMES.submitBtn],
      iconSrc: SubmitIcon,
      onClick: this.props.onSubmit,
      disabled: true,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Footer;
