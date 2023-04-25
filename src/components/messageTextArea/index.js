import template from "./messageTextArea.hbs";

const MessageInputArea = ({ savedMessage, name, placeholder }) =>
  template({
    savedMessage,
    name,
    placeholder,
  });

export default MessageInputArea;
