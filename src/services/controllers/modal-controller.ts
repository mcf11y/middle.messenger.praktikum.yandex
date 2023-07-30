import Block from "services/block";

import Modal, { ModalProps } from "components/Modal";

class ModalController {
  _modal: Nullable<Block>;
  _container: Nullable<HTMLElement>;

  constructor() {
    this._container = document.getElementById("modal-container");
    this._modal = null;
  }

  public createModal({
    title,
    content,
    hasSubmitBtn,
    submitBtnText,
    onClose,
    onSubmit,
  }: ModalProps) {
    this._modal = new Modal({
      title,
      content,
      hasSubmitBtn,
      submitBtnText,
      onClose,
      onSubmit,
    });

    if (!this._container) {
      throw Error("Cant find modal container");
    }

    this._container.innerHTML = "";
    this._container.append(this._modal.getContent()!);
  }

  public hideModal() {
    if (this._modal) {
      // @ts-ignore
      this._container?.style.display = "none";
    }
  }

  public showModal() {
    // @ts-ignore
    this._container?.style.display = "block";
  }
}

export default new ModalController();
