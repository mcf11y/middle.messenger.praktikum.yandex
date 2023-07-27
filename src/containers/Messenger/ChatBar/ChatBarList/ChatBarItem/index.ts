import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import { Connect } from "services/store";

import Badge from "components/Badge";
import Title from "components/Title";

import template from "./chatBarItem.hbs";

type Props = {
  id: string | number;
  avatar: Block;
  chatName: string;
  lastMessage?: string;
  time?: string;
  missedMesssageCount?: number;
  selected?: boolean;
  onClick: () => void;
};

class ChatItem extends Block<Props & { activeChatId?: number | string }> {
  protected init() {
    this.children.chatTitle = new Title({
      text: this.props.chatName,
      size: "xs",
    });

    if (this.props.missedMesssageCount) {
      this.children.countBadge = new Badge({ text: this.props.missedMesssageCount });
    }

    this.props.events = {
      click: () => {
        this.props.onClick();
      },
    };

    ChatController.fetchChatToken(+this.props.id);
  }

  protected render(): DocumentFragment {
    const selected = this.props.id === this.props.activeChatId;

    return this.compile(template, {
      ...this.props,
      selected,
    });
  }
}

function mapStateToProps(state: any) {
  if (!state || !state.activeChatId) return;

  // eslint-disable-next-line consistent-return
  return { activeChatId: state.activeChatId };
}

// eslint-disable-next-line import/prefer-default-export
export const ChatBarItem =
  // @ts-ignore
  Connect(ChatItem, mapStateToProps);
