import Block from "services/block";
import store from "services/store";
import { ChatData } from "types/chat";

import Avatar from "components/Avatar";

import ChatBarItem from "./ChatBarItem";
import template from "./chatBarList.hbs";
import { RESOURCE_URL } from 'constants/urls';

type Props = {
  chats: ChatData[];
  currentChatId?: number;
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

class ChatBarList extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  private renderItems(chats: ChatData[]) {
    return chats.map(({ id, name, avatar, unreadCount, lastMesage }) => {
      const chatItem = new ChatBarItem({
        id,
        chatName: name,
        avatar: new Avatar({
          size: "m",
          imageSrc:  avatar ? RESOURCE_URL + avatar : undefined,
        }),
        selected: id === this.props.currentChatId,

        time: lastMesage?.time && formattedDate(lastMesage.time),
        missedMesssageCount: +unreadCount,
        lastMessage: lastMesage?.content,

        onClick: (_id: string | number) => {
          store.set("currentChatId", _id);
        },
      });

      return chatItem;
    });
  }

  protected init() {
    this.children.items = this.renderItems(this.props.chats);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatBarList;
