import Block from "services/block";
import { SocketsMap } from "services/controllers/ws-message-controller";
import FormMediator from "services/form-mediator/form-mediator";
import { Connect } from "services/store";
import { ChatData } from "types/chat";

import template from "./Content.hbs";
import EmptyMessage from "./EmptyMessage";
import MessageBar from "./MessageBar";

type Props = {
  activeChat: ChatData;
  formMediator: FormMediator;
  chatSockets?: SocketsMap;
};

class Content extends Block<Props> {
  // todo понять в чем проблема
  protected componentDidUpdate() {
    return true;
  }

  protected render(): DocumentFragment {
    const activeChat = this.props.activeChat;

    this.children.contentContainer = activeChat
      ? new MessageBar({
        formMediator: this.props.formMediator,
        activeChat,
        chatSockets: this.props.chatSockets,
      })
      : new EmptyMessage();

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  return { activeChat: state.activeChat };
}

// eslint-disable-next-line import/prefer-default-export
export const ChatContent =
  // @ts-ignore
  Connect(Content, mapStateToProps);
