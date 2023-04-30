import MessageInputArea from "../../../../../components/messageTextArea";

import template from "./messageSectionFooter.hbs";

interface Props {
  attachButton: HbsNode;
  savedMessage: None<string>;
  submitButton: HbsNode;
}

const MessageSectionFooter = ({
  attachButton,
  savedMessage,
  submitButton,
}: Props) => {
  return template({
    attachButton,
    inputArea: MessageInputArea({
      savedMessage,
      name: "message",
      placeholder: "Сообщение",
    }),
    submitButton,
  });
};

export default MessageSectionFooter;
