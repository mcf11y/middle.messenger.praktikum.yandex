import Block from "utils/Block";
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

class Input extends Block {
  constructor({
    id,
    type = "text",
    placeholder,
    value,
    name,
    disabled = false,
    reverseAlign = false,
  }: Props) {
    super({
      id,
      type,
      placeholder,
      name,
      value,
      disabled,
      reverseAlign,
    });
  }

  public setValue(value: string) {
    // eslint-disable-next-line no-return-assign
    return (this.element as HTMLInputElement).value = value;
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
