import { RESOURCE_URL } from "constants/urls";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import { Connect } from "services/store";
import { ChatData } from "types/chat";

import Avatar from "components/Avatar";

import { ChatBarItem } from "./ChatBarItem";
import template from "./chatBarList.hbs";

type Props = {
  chats: ChatData[];
};

const formattedDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-US", options);
};

class ChatBar extends Block<Props> {
  private renderItems(chats: ChatData[]) {
    return chats.map((chat) => {
      const { id, name, avatar, unreadCount, lastMesage } = chat;

      const chatItem = new ChatBarItem({
        id,
        chatName: name,
        avatar: new Avatar({
          size: "m",
          imageSrc: avatar ? RESOURCE_URL + avatar : undefined,
        }),

        time: lastMesage?.time && formattedDate(lastMesage.time),
        missedMesssageCount: +unreadCount,
        lastMessage: lastMesage?.content,

        onClick: () => {
          ChatController.setActiveChat(chat);
        },
      });

      return chatItem;
    });
  }

  protected render(): DocumentFragment {
    if (this.props.chats) {
      this.children.items = this.renderItems(this.props.chats);
    }

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  if (!state || !state.chats) return;

  return { chats: state.chats };
}

// eslint-disable-next-line import/prefer-default-export
export const ChatBarList =
  // @ts-ignore
  Connect(ChatBar, mapStateToProps);
