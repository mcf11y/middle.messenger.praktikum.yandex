import Block from "utils/Block";
import template from "./divider.hbs";

class Divider extends Block {
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Divider;
