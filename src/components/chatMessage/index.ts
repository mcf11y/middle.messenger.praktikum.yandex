import template from "./chatMessage.hbs";

type Props = {
	message: string;
	time: string;
	my: boolean;
};

const ChatMessage = ({message, time, my}: Props) => template({
  message,
  time,
  color: my ? "blue" : "gray",
});

export default ChatMessage;
