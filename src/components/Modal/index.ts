import Block from "services/block";

import Button from "components/Button";
import Title from "components/Title";

import template from "./Modal.hbs";

export type ModalProps = {
  title?: string;
  content?: Block;
  submitBtnText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
};

class Modal extends Block {
  constructor({ title, content, submitBtnText, onSubmit, onClose }: ModalProps) {
    super({
      title,
      content,
      onSubmit,
      onClose,
      submitBtnText,
    });
  }

  protected init() {
    this.children.title = new Title({ text: this.props.title });
    this.children.submitBtn = new Button({
      variant: "primary",
      text: this.props.submitBtnText,
      onClick: this.props.onSubmit,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Modal;
