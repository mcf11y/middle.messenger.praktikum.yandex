import Chat from "containers/Chat";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import { Connect } from "services/store";

import template from "./template.hbs";

const validation = ChatController.validation;

class Messenger extends Block {
  protected componentDidMount(): void {}

  protected init() {
    ChatController.fetchChats();
  }

  protected componentDidUpdate() {
    return true;
  }

  protected render(): DocumentFragment {
    const { chats, currentChatId } = this.props;

    this.children.messenger = new Chat({
      chats,
      currentChatId,
      validation,
    });

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  if (!state || !state.chats) return;

  console.log("CHATS STATE", state.chats);

  // eslint-disable-next-line consistent-return
  return state;
}

// eslint-disable-next-line import/prefer-default-export
export const MessengerPage = Connect(Messenger, mapStateToProps);
