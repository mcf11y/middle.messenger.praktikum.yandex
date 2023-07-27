import Block from "services/block";
import ValidationMediator from "services/validation/validation-mediator";

import ChatBar from "./ChatBar";
import { ChatContent } from "./Content";
import template from "./Messenger.hbs";

type Props = {
  validation: ValidationMediator;
};

class Messenger extends Block<Props> {
  protected init() {
    this.children.chatBar = new ChatBar({});

    this.children.chatContent = new ChatContent({
      validation: this.props.validation,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Messenger;
