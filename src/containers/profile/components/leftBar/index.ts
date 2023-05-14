import IconButton from "components/iconButton";
import Block from "base-component";
import Router from "router";
import BackIcon from "../static/icons/arrow-left.svg";

import template from "./leftBar.hbs";

class LeftBar extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.backButton = new IconButton({
      iconSrc: BackIcon,
      onClick: () => {
        Router.back();
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LeftBar;
