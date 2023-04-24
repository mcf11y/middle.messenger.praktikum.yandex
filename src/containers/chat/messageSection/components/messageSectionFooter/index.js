import MessageInputArea from "../../../../../components/messageTextArea";

import template from "./messageSectionFooter.hbs";

const MessageSectionFooter = ({ attachButton, savedMessage, submitButton }) => {
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
