import Divider from "components/divider";
import Block from "utils/Block";
import template from "./customField.hbs";

type Props = {
  leftField?: Block;
  rightField?: Block;
  error?: string;
  divider?: boolean;
};

class CustomField extends Block {
  constructor({leftField, rightField, divider = true, error=""}: Props) {
    super({ leftField, rightField, divider, error});
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
