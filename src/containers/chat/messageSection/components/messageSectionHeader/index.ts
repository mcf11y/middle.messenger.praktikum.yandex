import Avatar from "../../../../../components/avatar";
import Title from "../../../../../components/title";

import template from "./messageSectionHeader.hbs";

type Props = {
	avatarImg?: string;
	chatName: string;
};

const MessageSectionHeader = ({avatarImg, chatName}: Props) => template({
  avatar: Avatar({size: "s", imageSrc: avatarImg}),
  title: Title({text: chatName, size: "s"}),
});

export default MessageSectionHeader;
