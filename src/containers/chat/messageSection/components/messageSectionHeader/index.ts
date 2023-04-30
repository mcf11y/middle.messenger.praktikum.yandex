import Avatar from "../../../../../components/avatar";
import Title from "../../../../../components/title";

import template from "./messageSectionHeader.hbs";

interface Props {
  avatarImg?: string;
  chatName: string;
}

const MessageSectionHeader = ({ avatarImg, chatName }: Props) => {
  return template({
    avatar: Avatar({ size: "s", imageSrc: avatarImg }),
    title: Title({ text: chatName, size: "s" }),
  });
};

export default MessageSectionHeader;
