import Block from "services/block";

import template from "./Badge.hbs";

type Props = {
  id?: string;
  size?: number;
  text: string | number;
};

class Badge extends Block<Props> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Badge;
