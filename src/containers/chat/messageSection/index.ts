import Divider from "../../../components/divider";
import IconButton from "../../../components/iconButton";

import Header from "./components/messageSectionHeader";
import Content from "./components/messageSectionContent";
import Footer from "./components/messageSectionFooter";

import AttachIcon from "./../../../../static/icons/attach-icon.svg";
import SubmitIcon from "./../../../../static/icons/arrow-right.svg";

import EmptyMessage from "./components/emptyMessageSection";

import template from "./messageSection.hbs";
import { Chat_details_data } from "../../../types/chat";

interface Props {
  currentChat: Chat_details_data;
}

const ChatMessages = ({ currentChat }: Props) => {
  if (!currentChat) {
    return EmptyMessage();
  }

  const { chatName, messages, myDraftMessage } = currentChat;

  return template({
    header: Header({
      chatName,
    }),
    content: Content({
      messages,
    }),
    footer: Footer({
      attachButton: IconButton({
        iconSrc: AttachIcon,
        variant: "secondary",
        btnWidth: 35,
        iconWidth: 20,
      }),
      savedMessage:
        myDraftMessage && myDraftMessage.contentType === "text"
          ? myDraftMessage.content.toString()
          : null,
      submitButton: IconButton({
        iconSrc: SubmitIcon,
      }),
    }),
    divider: Divider(),
  });
};

export default ChatMessages;
