import Block from "base-component";
import template from "./messageTextArea.hbs";

type Props = {
  id?: string;
  savedMessage?: Nullable<string>;
  name: string;
  placeholder: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onInput?: (e: any) => void;
};

class MessageInputArea extends Block {
  constructor({
    id,
    savedMessage,
    name,
    placeholder = "",
    onBlur,
    onFocus,
    onInput,
  }: Props) {
    super({
      id,
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

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessageInputArea;
