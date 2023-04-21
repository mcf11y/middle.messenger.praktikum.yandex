import template from "./messageTextArea.hbs";

const MessageInputArea = ({ savedMessage }) =>
  template({
    savedMessage,
  });

export default MessageInputArea;
