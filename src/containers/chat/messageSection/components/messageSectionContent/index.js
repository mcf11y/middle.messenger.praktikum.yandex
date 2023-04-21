import ChatMessage from "../../../../../components/chatMessage";

import template from "./messageSectionContent.hbs";

const MessageSectionContent = ({ id, messages }) => {
  const content = messages.map((message) => ({
    content: ChatMessage(message),
    position: message.my ? "right" : "left",
  }));

  return template({
    messages: content,
  });
};

export default MessageSectionContent;
