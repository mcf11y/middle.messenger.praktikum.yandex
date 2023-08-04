import { RESOURCE_URL } from "constants/urls";
import Block from "services/block";
import FormMediator from "services/form-mediator/form-mediator";
import { ChatData } from "types/chat";

import Divider from "components/Divider";

import { Content } from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import template from "./MessageBar.hbs";

import WSMessageController, {
  SocketsMap,
} from "services/controllers/ws-message-controller";

type Props = {
  activeChat: ChatData;
  formMediator: FormMediator;
  chatSockets?: SocketsMap;
};

let currentSocket: Nullable<WSMessageController>;

class MessageBar extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected init() {
    this.children.topDivider = new Divider();
    this.children.bottomDivider = new Divider();
  }

  public async fetchSocket(id: ID) {
    debugger;
    currentSocket = new WSMessageController(id);
    await currentSocket.connect();

    currentSocket.getOldMessages(0);
  }

  public async sendMessage() {
    const id = this.props.activeChat.id;

    if (this.props.chatSockets) {
      try {
        const wsController = this.props.chatSockets[id];

        wsController.sendMessage(this.props.formMediator);
      } catch (e) {
        debugger;
        console.error(e);

        if (!currentSocket) {
          await this.fetchSocket(id);
        }

        currentSocket?.sendMessage(this.props.formMediator);
      }
    }
  }

  protected render(): DocumentFragment {
    const { id, name, avatar } = this.props.activeChat;

    this.children.header = new Header({
      chatId: +id,
      chatName: name,
      avatarSrc: avatar ? RESOURCE_URL + avatar : undefined,
    });

    this.children.content = new Content();

    this.children.footer = new Footer({
      formMediator: this.props.formMediator,
      onSubmit: this.sendMessage.bind(this),

      // savedMessage:
      //   myDraftMessage != null && myDraftMessage.contentType === "text"
      //     ? myDraftMessage.content.toString()
      //     : undefined,
    });

    return this.compile(template, this.props);
  }
}

export default MessageBar;
