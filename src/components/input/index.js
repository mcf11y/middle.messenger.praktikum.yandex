import template from "./input.hbs";

const Input = ({
  id,
  type,
  placeholder,
  value,
  name,
  disabled = false,
  reverseAlign = false,
}) =>
  template({
    id,
    type,
    placeholder,
    name,
    value,
    disabled,
    reverseAlign,
  });

export default Input;
