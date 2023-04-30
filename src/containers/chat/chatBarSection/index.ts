import { ChatData, ChatDetailsData } from "types/chat";
import Button from "components/button";
import SearchInput from "components/searchInput";
import Input from "components/input";
import ChatList from "./components/chatList";

import arrowIcon from "../../../../static/icons/arrow-left.svg";

import template from "./chatBar.hbs";

type Props = {
  chats: ChatData[];
  currentChat?: ChatDetailsData;
};

const ChatBar = ({ chats }: Props) =>
  template({
    toProfileButton: Button({
      variant: "secondary",
      text: "Профиль",
      endIconSrc: arrowIcon,
    }),
    searchInput: SearchInput({
      input: Input({
        id: "search-input",
        placeholder: "Поиск",
        type: "search",
      }),
    }),

    chatList: ChatList({ chats }),
  });

export default ChatBar;
