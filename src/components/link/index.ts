import Block from "base-component";
import template from "./link.hbs";

type Props = {
  id?: string;
  text: string;
  href?: string;
  disabled?: boolean;
  color?: string;
  onClick?: (event: MouseEvent) => void;
};

class Link extends Block {
  constructor({ id, text, href, disabled = false, color, onClick }: Props) {
    super({
      id,
      text,
      href,
      disabled,
      color,
      onClick,
    });
  }

  protected init (): void {
    this.props.events = {
      click: (e: any) => this.props?.onClick?.(e),
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Link;
