import AddIcon from "icons/add-icon.svg";
import DeleteIcon from "icons/delete-icon.svg";
import DotsIcon from "icons/dots-icon.svg";
import EditIcon from "icons/edit-icon.svg";
import Block from "services/block";
import ChatController from "services/controllers/chat-controller";

import Avatar from "components/Avatar";
import Dropdown from "components/Dropdown";
import TextIconButton from "components/TextIconButton";
import Title from "components/Title";

import template from "./Header.hbs";

type Props = {
  chatId: number;
  avatarSrc?: string;
  chatName: string;
};

class Header extends Block<Props> {
  protected init() {
    const dropdown = new Dropdown({
      iconSrc: DotsIcon,

      items: [
        new TextIconButton({
          id: 0,
          text: "Добавить пользователя",
          iconSrc: AddIcon,
          onClick: () => {
            ChatController.addUser(this.props.chatId);
            (this.children.menu as any).hideDropdown();
          },
        }),

        new TextIconButton({
          id: 1,
          text: "Поменять аватар чата",
          iconSrc: EditIcon,
          onClick: () => {
            ChatController.updateAvatar(this.props.chatId);
            (this.children.menu as any).hideDropdown();
          },
        }),

        new TextIconButton({
          id: 2,
          text: "Удалить пользователя",
          iconSrc: DeleteIcon,
          onClick: () => {
            ChatController.deleteUser(this.props.chatId);
            (this.children.menu as any).hideDropdown();
          },
        }),

        new TextIconButton({
          id: 3,
          text: "Удалить чат",
          iconSrc: DeleteIcon,
          onClick: () => {
            ChatController.deleteChat(this.props.chatId);
            (this.children.menu as any).hideDropdown();
          },
        }),
      ],
    });

    this.children.menu = dropdown;
  }

  protected render(): DocumentFragment {
    this.children.avatar = new Avatar({ size: "s", imageSrc: this.props.avatarSrc });
    this.children.title = new Title({ text: this.props.chatName, size: "s" });

    return this.compile(template, this.props);
  }
}

export default Header;
