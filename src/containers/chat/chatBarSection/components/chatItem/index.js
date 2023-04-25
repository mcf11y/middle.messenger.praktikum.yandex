import Avatar from "../../../../../components/avatar";
import Title from "../../../../../components/title";
import Badge from "../../../../../components/badge";

import template from "./chatItem.hbs";

const ChatItem = ({
  avatar,
  chatName,
  lastMessage,
  time,
  missedMesssageCount,
}) => {
  return template({
    avatar,
    chatName: Title({
      text: chatName,
      size: "xs",
    }),
    lastMessage,
    time,
    countBadge: Badge({
      text: missedMesssageCount,
    }),
  });
};

export default ChatItem;
