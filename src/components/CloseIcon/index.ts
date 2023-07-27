import Block from "services/block";

import template from "./CloseIcon.hbs";

type Props = {
  onClose?: () => void;
};

class CloseIcon extends Block<Props> {
  protected init() {
    this.props.events = {
      click: this.props?.onClose?.bind(this),
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default CloseIcon;
