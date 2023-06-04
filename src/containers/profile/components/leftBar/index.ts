import IconButton from "components/iconButton";
import Block from "base-component";

import PAGE_URL from "constants/pageUrls";
import router from "router";
import BackIcon from "../../../../../static/icons/arrow-left.svg";

import template from "./leftBar.hbs";

class LeftBar extends Block {
  constructor() {
    super({});
  }

  protected init(): void {
    this.children.backButton = new IconButton({
      iconSrc: BackIcon,
      onClick: () => {
        router.go(PAGE_URL.INDEX);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LeftBar;
