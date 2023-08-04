import { IDS, NAMES } from "constants/fields";
import Block from "services/block";

import Button from "components/Button";
import CloseIcon from "components/CloseIcon";
import Title from "components/Title";

import template from "./Modal.hbs";

export type ModalProps = {
  title?: string;
  content?: Block;
  hasSubmitBtn?: boolean;
  submitBtnText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
};

class Modal extends Block<ModalProps> {
  public show() {
    this.show();
  }

  public hide() {
    this.hide();
  }

  protected init(): void {
    this.children.title = new Title({ text: this.props.title });

    if (this.props.hasSubmitBtn) {
      this.children.submitBtn = new Button({
        variant: "primary",
        id: IDS[NAMES.submitBtn],
        text: this.props.submitBtnText,
        onClick: this.props.onSubmit,
      });
    }

    this.children.closeIcon = new CloseIcon({
      onClose: this.props.onClose,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Modal;
