import Block from "services/block";
import template from "./label.hbs";

type Props = {
  id?: string;
  forId?: string;
  text: string;
  isBlack?: boolean;
};

class Label extends Block {
  constructor({ id, forId, text, isBlack = false }: Props) {
    super({
      id,
      forId,
      text,
      isBlack,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Label;
