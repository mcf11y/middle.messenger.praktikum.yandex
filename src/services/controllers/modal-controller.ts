import Block from "services/block";

import Modal, { ModalProps } from "components/Modal";

class ModalController {
  _modal: Block;

  constructor() {
    this._modal = new Modal({});

    // eslint-disable-next-line no-debugger
    debugger;

    const modalContainer = document.getElementById("modal");

    if (modalContainer) {
      modalContainer.innerHTML = "";
      modalContainer.append(this._modal.getContent()!);
    }
  }

  public show() {
    this._modal?.show();
  }

  public hide() {
    this._modal?.hide();
  }

  public reset() {
    this._modal?.setProps({});
  }

  public setModalContent({
    title,
    content,
    submitBtnText,
    onClose,
    onSubmit,
  }: ModalProps) {
    this._modal?.setProps({
      title,
      content,
      submitBtnText,
      onClose,
      onSubmit,
    });
  }
}

export default new ModalController();
