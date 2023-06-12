import Block from "services/block";
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
