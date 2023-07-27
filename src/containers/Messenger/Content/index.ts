import Block from "services/block";
import { Connect } from "services/store";
import ValidationMediator from "services/validation/validation-mediator";

import template from "./Content.hbs";
import EmptyMessage from "./EmptyMessage";
import MessageSection from "./Message";

type Props = {
  activeChat: any;
  activeChatId?: number;
  validation: ValidationMediator;
};

class Content extends Block<Props> {
  protected render(): DocumentFragment {
    const activeChat = this.props.activeChat;

    this.children.content = activeChat
      ? new MessageSection({ validation: this.props.validation, activeChat })
      : new EmptyMessage();

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  return { activeChatId: state.activeChatId, activeChat: state.activeChat };
}

// eslint-disable-next-line import/prefer-default-export
export const ChatContent =
  // @ts-ignore
  Connect(Content, mapStateToProps);
