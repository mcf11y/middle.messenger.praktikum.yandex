import Block from "services/block";
import { SocketsMap } from "services/controllers/ws-message-controller";
import FormMediator from "services/form-mediator/form-mediator";

import ChatBar from "./ChatBar";
import { ChatContent } from "./Content";
import template from "./Messenger.hbs";

type Props = {
  formMediator: FormMediator;
  chatSockets?: SocketsMap;
};

class Messenger extends Block<Props> {
  protected init() {
    this.children.chatBar = new ChatBar({});

    this.children.chatContent = new ChatContent({
      formMediator: this.props.formMediator,
      chatSockets: this.props.chatSockets,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Messenger;
