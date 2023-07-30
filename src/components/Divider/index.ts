import Block from "services/block";

import template from "./Divider.hbs";

class Divider extends Block {
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Divider;
