import template from "./button.hbs";

const Button = ({
  id,
  variant = "primary",
  type,
  text,
  disabled = false,
  startIcon,
  endIcon,
  width,
}) =>
  template({
    id,
    variant,
    type,
    text,
    disabled,
    withIcon: startIcon || endIcon,
    startIcon,
    endIcon,
    width,
  });

export default Button;
