import Chat from "containers/Messenger";
import ChatController from "services/controllers/chat-controller";

const formMediator = ChatController.formMediator;

const MessengerPage = () =>
  new Chat({
    formMediator,
  });

export default MessengerPage;
