import ChatMessage from "../../../../../components/chatMessage";
import { Message_data } from "../../../../../types/chat";

import template from "./messageSectionContent.hbs";

interface Props {
  id?: string;
  messages: Message_data[];
}

const MessageSectionContent = ({ messages }: Props) => {
  const content = messages.map(({ contentType, content, time, my }) => ({
    content: ChatMessage({
      message: contentType === "text" ? (content as string) : "",
      time: time.toString(),
      my,
    }),
    position: my ? "right" : "left",
  }));

  return template({
    messages: content,
  });
};

export default MessageSectionContent;
