import PAGE_URL from "constants/page-urls";
import BackIcon from "icons/arrow-left.svg";
import Block from "services/block";
import router from "services/router";

import IconButton from "components/IconButton";

import template from "./LeftBar.hbs";

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
