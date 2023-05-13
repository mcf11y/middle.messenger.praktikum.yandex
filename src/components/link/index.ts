import Block from "utils/Block";
import template from "./link.hbs";

type Props = {
  id?: string;
  text: string;
  href?: string;
  disabled?: boolean;
  color?: string;
};

class Link extends Block {
  constructor({ id, text, href, disabled = false, color }: Props) {
    super({
      id,
      text,
      href,
      disabled,
      color,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Link;
