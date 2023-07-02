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

class ChatBarList extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  private renderItems(chats: ChatData[]) {
    return chats.map(
      ({ id, chatName, lastMessage, time, missedMesssageCount, avatarImage }) => {
        const chatItem = new ChatBarItem({
          id,
          chatName,
          avatar: new Avatar({
            size: "m",
            imageSrc: avatarImage,
          }),
          time: time.toString(),
          missedMesssageCount,
          lastMessage: lastMessage?.content.toString(),
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
      }
    );
  }

  protected init() {
    this.children.items = this.renderItems(this.props.chats);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatBarList;
