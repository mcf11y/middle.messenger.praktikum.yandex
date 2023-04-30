import Avatar from "../../../../../components/avatar";
import { Chat_data } from "../../../../../types/chat";

import ChatItem from "../chatItem";
import template from "./chatList.hbs";

interface Props {
  chats: Chat_data[];
}

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
