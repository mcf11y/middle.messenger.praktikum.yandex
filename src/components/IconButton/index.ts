import Block from "services/block";

import template from "./IconButton.hbs";

type Props = {
  id?: string;
  variant?: "primary" | "secondary";
  iconSrc: string;
  disabled?: boolean;
  btnWidth?: number;
  iconWidth?: number;
  onClick?: () => void;
};

class IconButton extends Block {
  constructor({
    id,
    variant = "primary",
    iconSrc,
    disabled = false,
    btnWidth,
    iconWidth,
    onClick,
  }: Props) {
    super({
      id,
      iconSrc,
      variant,
      btnWidth,
      iconWidth,
      disabled,
      onClick,
    });
  }

  protected init(): void {
    this.props.events = {
      click: this.props?.onClick?.bind(this),
    };
  }

  public disabled(): void {
    this.props.disabled = true;
  }

  public enabled(): void {
    this.props.disabled = false;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default IconButton;
