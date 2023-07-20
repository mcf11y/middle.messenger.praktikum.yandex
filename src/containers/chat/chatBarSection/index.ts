import PAGE_URL from "constants/page-urls";
import arrowIcon from "icons/arrow-go-to.svg";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import Router from "services/router";
import { ChatData, ChatDetailsData } from "types/chat";

import Button from "components/Button";
import Input from "components/Input";
import SearchInput from "components/SearchInput";

import template from "./chatBar.hbs";
import ChatList from "./ChatBarList";

type Props = {
  chats: ChatData[];
  currentChat?: ChatDetailsData;
};

class ChatBar extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    this.children.addChatButton = new Button({
      variant: "secondary",
      text: "Создать новый чат",

      onClick: () => {
        ChatController.createChat();
      },
    });

    this.children.toProfileButton = new Button({
      variant: "secondary",
      text: "Профиль",
      endIconSrc: arrowIcon,
      onClick: () => Router.go(PAGE_URL.PROFILE),
    });

    this.children.searchInput = new SearchInput({
      input: new Input({
        id: "search-input",
        placeholder: "Поиск",
        type: "search",
      }),
    });

    if (this.props.chats && this.props.chats.length > 0) {
      this.children.chatList = new ChatList({ chats: this.props.chats });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatBar;
