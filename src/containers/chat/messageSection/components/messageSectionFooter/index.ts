import MessageInputArea from "../../../../../components/messageTextArea";

import template from "./messageSectionFooter.hbs";

type Props = {
	attachButton: HbsNode;
	savedMessage?: Nullable<string>;
	submitButton: HbsNode;
};

const MessageSectionFooter = ({
  attachButton,
  savedMessage,
  submitButton,
}: Props) => template({
  attachButton,
  inputArea: MessageInputArea({
    savedMessage,
    name: "message",
    placeholder: "Сообщение",
  }),
  submitButton,
});

export default MessageSectionFooter;
