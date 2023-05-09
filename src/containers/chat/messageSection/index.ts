import { ChatDetailsData } from "types/chat";
import IconButton from "components/iconButton";
import Divider from "components/divider";
import Block from "utils/Block";
import Header from "./components/messageSectionHeader";
import Content from "./components/messageSectionContent";
import Footer from "./components/messageSectionFooter";

import AttachIcon from "../../../../static/icons/attach-icon.svg";
import SubmitIcon from "../../../../static/icons/arrow-right.svg";

import template from "./messageSection.hbs";

type Props = {
  currentChat: ChatDetailsData;
};

class ChatMessages extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    const { chatName, messages, myDraftMessage } = this.props.currentChat;

    this.children.header = new Header({ chatName });
    this.children.topDivider = new Divider();
    this.children.content = new Content({ messages });
    this.children.bottomDivider = new Divider();
    this.children.footer = new Footer({
      attachButton: new IconButton({
        iconSrc: AttachIcon,
        variant: "secondary",
        btnWidth: 35,
        iconWidth: 20,
      }),
      savedMessage:
        myDraftMessage != null && myDraftMessage.contentType === "text"
          ? myDraftMessage.content.toString()
          : undefined,
      submitButton: new IconButton({
        iconSrc: SubmitIcon,
      }),
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatMessages;
