import template from "./messageTextArea.hbs";

interface Props {
  savedMessage: None<string>;
  name: string;
  placeholder: string;
}

const MessageInputArea = ({ savedMessage, name, placeholder = "" }: Props) =>
  template({
    savedMessage,
    name,
    placeholder,
  });

export default MessageInputArea;
