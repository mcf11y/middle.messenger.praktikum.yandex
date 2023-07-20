import Chat from "containers/Chat";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import { Connect } from "services/store";

import template from "./template.hbs";

const validation = ChatController.validation;

class Messenger extends Block {
  protected componentDidMount(): void {}

  protected render(): DocumentFragment {
    const { chats } = this.props;

    this.children.messenger = new Chat({
      chats,
      validation,
    });

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  if (!state || !state) return;

  console.log("CHATS STATE", state);

  // eslint-disable-next-line consistent-return
  return state.chats;
}

// eslint-disable-next-line import/prefer-default-export
export const MessengerPage = Connect(Messenger, mapStateToProps);
