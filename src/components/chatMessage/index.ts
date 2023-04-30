import template from "./chatMessage.hbs";

interface Props {
  message: string;
  time: string;
  my: boolean;
}

const ChatMessage = ({ message, time, my }: Props) => {
  return template({
    message,
    time,
    color: my ? "blue" : "gray",
  });
};

export default ChatMessage;
