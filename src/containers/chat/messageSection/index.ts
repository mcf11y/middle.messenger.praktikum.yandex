import { ChatDetailsData } from "types/chat";
import IconButton from "components/iconButton";
import Divider from "components/divider";
import Header from "./components/messageSectionHeader";
import Content from "./components/messageSectionContent";
import Footer from "./components/messageSectionFooter";

import AttachIcon from "../../../../static/icons/attach-icon.svg";
import SubmitIcon from "../../../../static/icons/arrow-right.svg";

import EmptyMessage from "./components/emptyMessageSection";

import template from "./messageSection.hbs";

type Props = {
  currentChat: ChatDetailsData;
};

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
        myDraftMessage != null && myDraftMessage.contentType === "text"
          ? myDraftMessage.content.toString()
          : undefined,
      submitButton: IconButton({
        iconSrc: SubmitIcon,
      }),
    }),
    divider: Divider(),
  });
};

export default ChatMessages;
