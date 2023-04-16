import template from "./input.hbs";
import * as styles from "./input.module.scss";

const Input = ({ id, type, placeholder, value, name, disabled = false }) => {
  return template({
    id,
    type,
    placeholder,
    name,
    value,
    disabled,
    styles,
  });
};

export default Input;
