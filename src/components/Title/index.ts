import Block from "services/block";

import template from "./Title.hbs";

type Props = {
  id?: string;
  text?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: "gray";
};

class Title extends Block<Props> {
  constructor({ id, text = "", size, color }: Props) {
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
