import Button from "../../../components/button";
import Input from "../../../components/input";
import SearchInput from "../../../components/searchInput";
import ChatList from "./components/chatList";
import arrowIcon from "../../../../static/icons/arrow-go-to.svg";

import template from "./chatBar.hbs";

const ChatBar = ({ chats, currentChat }) => {
  return template({
    toProfileButton: Button({
      variant: "secondary",
      text: "Профиль",
      endIcon: arrowIcon,
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
