import Button from "../../../components/button";
import Input from "../../../components/input";
import SearchInput from "../../../components/searchInput";
import ChatList from "./components/chatList";
import arrowIcon from "../../../../static/icons/arrow-go-to.svg";

import template from "./chatBar.hbs";
import { Chat_data } from "../../../types/chat";
import { Chat_details_data } from "../../../types/chat";

interface Props {
  chats: Chat_data[];
  currentChat?: Chat_details_data;
}

const ChatBar = ({ chats }: Props) => {
  return template({
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
};

export default ChatBar;
