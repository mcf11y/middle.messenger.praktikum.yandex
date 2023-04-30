import { MessageData } from "types/chat";

import ChatMessage from "components/chatMessage";
import template from "./messageSectionContent.hbs";

type Props = {
  id?: string;
  messages: MessageData[];
};

const MessageSectionContent = ({ messages }: Props) => {
  const messagesContent = messages.map(({ contentType, content, time, my }) => ({
    content: ChatMessage({
      message: contentType === "text" ? (content as string) : "",
      time: time.toString(),
      my,
    }),
    position: my ? "right" : "left",
  }));

  return template({
    messages: messagesContent,
  });
};

export default MessageSectionContent;
