import { RESOURCE_URL } from "constants/urls";
import Block from "services/block";
import WSMessageController from "services/controllers/ws-message-controller";
import FormMediator from "services/form-mediator/form-mediator";
import { ChatData } from "types/chat";

import Divider from "components/Divider";

import { Content } from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import template from "./MessageSection.hbs";

type Props = {
  activeChat: ChatData;
  formMediator: FormMediator;
};

class MessageSection extends Block<Props> {
  private messageController: Nullable<WSMessageController> = null;

  constructor(props: Props) {
    super(props);

    try {
      this.messageController = new WSMessageController(+this.props.activeChat.id);
      this.messageController.connect().then(() => {
        // this.messageController?.getOldMessages(0);
      });
    } catch (e) {
      console.error(e);
    }
  }

  protected init() {
    this.children.topDivider = new Divider();
    this.children.bottomDivider = new Divider();
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
      onSubmit: () => {
        this.messageController?.sendMessage(this.props.formMediator);
      },

      // savedMessage:
      //   myDraftMessage != null && myDraftMessage.contentType === "text"
      //     ? myDraftMessage.content.toString()
      //     : undefined,
    });

    return this.compile(template, this.props);
  }
}

export default MessageSection;
