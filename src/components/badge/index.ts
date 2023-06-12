import Block from "services/block";
import template from "./badge.hbs";

type Props = {
  id?: string;
  size?: number;
  text: string | number;
};

class Badge extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Badge;
