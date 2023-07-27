import Chat from "containers/Messenger";
import ChatController from "services/controllers/chat-controller";

const validation = ChatController.validation;

const MessengerPage = () => {
  ChatController.fetchChats();

  return new Chat({
    validation,
  });
};

export default MessengerPage;
