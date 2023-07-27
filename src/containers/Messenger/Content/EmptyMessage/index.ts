import Block from "services/block";

import template from "./EmptyMessage.hbs";

class EmptyMessage extends Block {
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default EmptyMessage;
