import Block from "utils/Block";
import { InputValidateEnum, validateInput } from "utils/validations";
import template from "./messageTextArea.hbs";

type Props = {
  savedMessage?: Nullable<string>;
  name: string;
  placeholder: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onInput?: (e: any) => void;
};

class MessageInputArea extends Block {
  constructor({
    savedMessage,
    name,
    placeholder = "",
    onBlur,
    onFocus,
    onInput,
  }: Props) {
    super({
      savedMessage,
      name,
      placeholder,
      onFocus,
      onBlur,
      onInput,
    });
  }

  protected init(): void {
    this.props.events = {
      focus: this.props?.onFocus?.bind(this),
      blur: this.props?.onBlur?.bind(this),
      input: this.props?.onInput?.bind(this),
    };
  }

  public setValue(value: string) {
    // eslint-disable-next-line no-return-assign
    return ((this.element as HTMLTextAreaElement).value = value);
  }

  public getName() {
    return (this.element as HTMLTextAreaElement).name;
  }

  public getValue() {
    return (this.element as HTMLTextAreaElement).value;
  }

  public validate(): string {
    const value = this.getValue();
    const error = validateInput(value, InputValidateEnum.NOT_EMPTY);
    return error;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageInputArea;
