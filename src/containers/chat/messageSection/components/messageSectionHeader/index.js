import Avatar from "../../../../../components/avatar";
import Title from "../../../../../components/title";

import template from "./messageSectionHeader.hbs";

const MessageSectionHeader = ({ avatarImg, chatName }) => {
  return template({
    avatar: Avatar({ size: "s" , image: avatarImg }),
    title: Title({ text: chatName, size: "s" }),
  });
};

export default MessageSectionHeader;
