import Block from "services/block";
import template from "./avatar.hbs";

type Props = {
  id?: string;
  size?: "s" | "m" | "l";
  imageSrc?: string | HTMLImageElement;
};

class Avatar extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Avatar;
