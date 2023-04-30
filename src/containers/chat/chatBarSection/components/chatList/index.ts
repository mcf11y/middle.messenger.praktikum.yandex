import Avatar from "components/avatar";
import { ChatData } from "types/chat";
import ChatItem from "../chatItem";

import template from "./chatList.hbs";

type Props = {
  chats: ChatData[];
};

const ChatList = ({ chats }: Props) => {
  const renderedItems = chats.map(
    ({ id, chatName, lastMessage, time, missedMesssageCount, avatarImage }) =>
      ChatItem({
        id,
        chatName,
        avatar: Avatar({
          size: "m",
          imageSrc: avatarImage,
        }),
        time: time.toString(),
        missedMesssageCount,
        lastMessage: lastMessage?.content.toString(),
      })
  );

  return template({
    items: renderedItems,
  });
};

export default ChatList;
