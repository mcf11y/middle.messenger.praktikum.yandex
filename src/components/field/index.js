import input from "../input";

import template from "./field.hbs";
import * as styles from "./field.module.scss";

const Field = ({
  id,
  type,
  label,
  name,
  value,
  placeholder,
  disabled = false,
  customClasses,
}) => {
  const options = {
    id,
    styles,
    customClasses,
    label,
    input: input({
      id,
      type,
      placeholder,
      name,
      value,
      disabled,
    }),
  };

  return template(options);
};

export default Field;
