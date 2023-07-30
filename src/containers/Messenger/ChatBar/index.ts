import PAGE_URL from "constants/page-urls";
import arrowIcon from "icons/arrow-go-to.svg";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";
import Router from "services/router";

import Button from "components/Button";
import Input from "components/Input";
import SearchInput from "components/SearchInput";

import template from "./ChatBar.hbs";
import { ChatBarList } from "./ChatBarList";

class ChatBar extends Block {
  protected init() {
    ChatController.fetchChats();

    this.children.addChatButton = new Button({
      variant: "secondary",
      text: "Создать чат",

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

    this.children.chatList = new ChatBarList();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatBar;
