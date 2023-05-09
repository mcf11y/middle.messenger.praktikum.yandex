import Block from "utils/Block";
import template from "./field.hbs";

type Props = {
  label: Block;
  input: Block;
  style?: any;
};

class Field extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Field;
