import template from "./input.hbs";

type Props = {
  id?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  reverseAlign?: boolean;
};

const Input = ({
  id,
  type = "text",
  placeholder,
  value,
  name,
  disabled = false,
  reverseAlign = false,
}: Props) =>
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
