import template from "./messageTextArea.hbs";

type Props = {
  savedMessage: None<string>;
  name: string;
  placeholder: string;
};

const MessageInputArea = ({ savedMessage, name, placeholder = "" }: Props) =>
  template({
    savedMessage,
    name,
    placeholder,
  });

export default MessageInputArea;
