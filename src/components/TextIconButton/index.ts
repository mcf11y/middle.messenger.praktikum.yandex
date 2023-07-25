import Block from "services/block";

import template from "./TextIconButton.hbs";

interface Props {
  id?: number;
  iconSrc: string;
  text: string;
  onClick?: (id?: number) => void;
}

class TextIconButton extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init(): void {
    this.props.events = {
      click: () => this.props?.onClick?.(this.props.id),
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default TextIconButton;
