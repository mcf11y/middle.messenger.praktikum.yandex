import template from "./button.hbs";
import * as styles from "./button.module.scss";

const Button = ({
  view,
  type,
  text,
  id,
  onClick,
  disabled = false,
  customClasses,
}) => {
  const options = {
    text,
    id,
    onClick,
    styles: {
      container: styles[view === "link" ? "link" : "primary"],
    },
    name: `custom-button-${id}`,
    value: `custom-button-${id}`,
    type,
    customClasses,
    disabled,
  };

  return template(options);
};

export default Button;
