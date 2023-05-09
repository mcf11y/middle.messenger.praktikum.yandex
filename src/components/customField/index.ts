import Divider from "components/divider";
import Block from "utils/Block";
import template from "./customField.hbs";

type Props = {
  leftField?: Block;
  rightField?: Block;
  divider?: boolean;
};

class CustomField extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    if (this.props.divider) {
      this.children.divider = new Divider();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default CustomField;
