import Avatar from "../../../../../components/avatar";

import ChatItem from "../chatItem";
import template from "./chatList.hbs";

const ChatList = ({ chats }) => {
  const renderedItems = chats.map((item) =>
    ChatItem({
      avatar: Avatar({
        size: "m",
        image: item.avatar,
      }),
      ...item,
    })
  );

  return template({
    items: renderedItems,
  });
};

export default ChatList;
