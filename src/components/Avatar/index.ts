import Block from "@/services/block";

import template from "./Avatar.hbs";

type Props = {
  id?: string;
  size?: "s" | "m" | "l";
  imageSrc?: string | HTMLImageElement;

  isEditable?: boolean;
  onClick?: () => void;
};

class Avatar extends Block<Props> {
  protected init() {
    this.props.events = {
      click: this.props?.onClick?.bind(this),
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Avatar;
