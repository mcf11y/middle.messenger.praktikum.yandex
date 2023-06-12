import Block from "services/block";
import template from "./button.hbs";

type Props = {
  id?: string;
  variant: "primary" | "secondary" | "link";
  type?: "submit" | "reset" | "button";
  text: string;
  disabled?: boolean;
  startIconSrc?: string;
  endIconSrc?: string;
  width?: number;
  onClick?: (event: MouseEvent) => void;
  onHover?: (event: MouseEvent) => void;
};

class Button extends Block {
  constructor({
    id,
    variant = "primary",
    type,
    text,
    disabled = false,
    startIconSrc,
    endIconSrc,
    width,
    onClick,
  }: Props) {
    super({
      id,
      variant,
      type,
      text,
      disabled,
      withIcon: startIconSrc || endIconSrc,
      startIconSrc,
      endIconSrc,
      width,
      onClick,
    });
  }

  protected init () {
    this.props.events = {
      click: this.props?.onClick?.bind(this)
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Button;
