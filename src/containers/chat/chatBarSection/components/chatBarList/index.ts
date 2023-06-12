import Avatar from "components/avatar";
import { ChatData } from "types/chat";
import Block from "services/block";
import router from "services/router";
import PAGE_URL from "constants/pageUrls";
import ChatItem from "../chatBarItem";

import template from "./chatBarList.hbs";

type Props = {
  chats: ChatData[];
};

class ChatList extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  private renderItems(chats: ChatData[]) {
    return chats.map(
      ({ id, chatName, lastMessage, time, missedMesssageCount, avatarImage }) =>
        new ChatItem({
          id,
          chatName,
          avatar: new Avatar({
            size: "m",
            imageSrc: avatarImage,
          }),
          time: time.toString(),
          missedMesssageCount,
          lastMessage: lastMessage?.content.toString(),

          onClick: (_id: string | number) => {
            router.go(`${PAGE_URL.CHATS}/${_id}`);
          }
        })
    );
  }

  protected init() {
    this.children.items = this.renderItems(this.props.chats);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatList;
