import template from "./link.hbs";

interface Props {
  id?: string;
  text: string;
  href?: string;
  disabled?: boolean;
  color?: string;
}

const Link = ({ id, text, href, disabled = false, color }: Props) =>
  template({
    id,
    text,
    href,
    disabled,
    color,
  });

export default Link;
