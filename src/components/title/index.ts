import Block from "base-component";
import template from "./title.hbs";

type Props = {
  id?: string;
  text: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: "gray";
};

class Title extends Block {
  constructor({ id, text, size, color }: Props) {
    super({
      id,
      text,
      size,
      color,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Title;
