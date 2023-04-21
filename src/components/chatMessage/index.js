import template from "./chatMessage.hbs";

const ChatMessage = ({ type = "text", message, data, my }) => {
  return template({
    type,
    message,
    data,
    color: my ? "blue" : "gray",
  });
};

export default ChatMessage;
