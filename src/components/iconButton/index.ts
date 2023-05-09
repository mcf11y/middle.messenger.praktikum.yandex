import Block from "utils/Block";
import template from "./iconButton.hbs";

type Props = {
  id?: string;
  variant?: "primary" | "secondary";
  iconSrc: string;
  disabled?: boolean;
  btnWidth?: number;
  iconWidth?: number;
};

class IconButton extends Block {
  constructor({
    id,
    variant = "primary",
    iconSrc,
    disabled = false,
    btnWidth,
    iconWidth,
  }: Props) {
    super({
      id,
      iconSrc,
      variant,
      btnWidth,
      iconWidth,
      disabled,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default IconButton;
