import template from "./link.hbs";

const Link = ({ id, text, href, disabled = false, color }) =>
  template({
    id,
    text,
    href,
    disabled,
    color,
  });

export default Link;
