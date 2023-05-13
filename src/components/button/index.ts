import Block from "utils/Block";
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
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Button;
