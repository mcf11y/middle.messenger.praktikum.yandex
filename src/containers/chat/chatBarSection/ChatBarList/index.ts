import PAGE_URL from "constants/page-urls";
import Block from "services/block";
import router from "services/router";
import { ChatData } from "types/chat";

import Avatar from "components/Avatar";

import ChatBarItem from "./ChatBarItem";
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
          imageSrc: avatar,
        }),
        time: formattedDate(lastMesage.time),
        missedMesssageCount: +unreadCount,
        lastMessage: lastMesage.content,
        selected: window.location.pathname === `${PAGE_URL.CHATS}/${id}`,
        onClick: (_id: string | number) => {
          router.go(`${PAGE_URL.CHATS}/${_id}`);
          chatItem.setProps({ selected: true });

          (this.children.items as Block[]).forEach((item) => {
            if (item !== chatItem) {
              item.setProps({ selected: false });
            }
          });
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
