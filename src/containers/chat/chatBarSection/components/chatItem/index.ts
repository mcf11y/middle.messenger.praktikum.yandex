import Title from "../../../../../components/title";
import Badge from "../../../../../components/badge";

import template from "./chatItem.hbs";

interface Props {
  id: None<string | number>;
  avatar: HbsNode;
  chatName: string;
  lastMessage?: string;
  time: string;
  missedMesssageCount?: number;
}

const ChatItem = ({
  avatar,
  chatName,
  lastMessage,
  time,
  missedMesssageCount,
}: Props) => {
  return template({
    avatar,
    chatName: Title({
      text: chatName,
      size: "xs",
    }),
    lastMessage,
    time,
    countBadge:
      missedMesssageCount !== undefined
        ? Badge({
            text: missedMesssageCount,
          })
        : null,
  });
};

export default ChatItem;
