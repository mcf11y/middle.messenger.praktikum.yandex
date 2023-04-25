import Divider from "../../../components/divider";
import IconButton from "../../../components/iconButton";

import Header from "./components/messageSectionHeader";
import Content from "./components/messageSectionContent";
import Footer from "./components/messageSectionFooter";

import AttachIcon from "./../../../../static/icons/attach-icon.svg";
import SubmitIcon from "./../../../../static/icons/arrow-right.svg";

import EmptyMessage from "./components/emptyMessageSection";

import template from "./messageSection.hbs";

const ChatMessages = ({ currentChat }) => {
  if (!currentChat) {
    return EmptyMessage();
  }

  return template({
    header: Header({
      chatName: currentChat.chatName,
    }),
    content: Content({
      messages: currentChat.messages,
    }),
    footer: Footer({
      attachButton: IconButton({
        icon: AttachIcon,
        variant: "secondary",
        btnWidth: 35,
        iconWidth: 20,
      }),
      savedMessage: currentChat.savedMessage,
      submitButton: IconButton({
        icon: SubmitIcon,
      }),
    }),
    divider: Divider(),
  });
};

export default ChatMessages;
