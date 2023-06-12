import Block from "services/block";
import template from "./input.hbs";

type Props = {
  id?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  reverseAlign?: boolean;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
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
    onFocus,
    onBlur,
    onChange,
    onInput,
  }: Props) {
    super({
      id,
      type,
      placeholder,
      name,
      value,
      disabled,
      reverseAlign,
      onFocus,
      onBlur,
      onChange,
      onInput,
    });
  }

  protected init(): void {
    this.props.events = {
      blur: (e: FocusEvent) => {
        this.props.onBlur?.(e);
      },
      input: (e: InputEvent) => {
        this.props.onInput?.(e);
      },
      change: (e: InputEvent) => this.props.onChange?.(e),
      focus: (e: FocusEvent) => this.props.onFocus?.(e),
    };
  }

  public setValue(value: string) {
    // eslint-disable-next-line no-return-assign
    return ((this.element as HTMLInputElement).value = value);
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
