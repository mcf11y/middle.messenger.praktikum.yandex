/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from "utils/Block";
import Input from "components/input";
import { validateInput } from "utils/validations";
import Label from "components/label";
import template from "./field.hbs";

type Props = {
  id: string;
  type: string;
  fieldName: string;
  placeholder?: string;
  inputName?: string;
  style?: any;
};

class Field extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init(): void {
    this.children.label = new Label({
      forId: this.props.id,
      text: this.props.fieldName,
    });

    this.children.input = new Input({
      id: this.props.id,
      type: this.props.type,
      placeholder: this.props.placeholder,
      name: this.props.inputName,
      onBlur: this.validateField.bind(this),
    });
  }

  public getValue() {
    return (this.children.input as Input).getValue();
  }

  public getName() {
    return (this.children.input as Input).getName();
  }

  public setValue(value: string) {
    return (this.children.input as Input).setValue(value);
  }

  public validateField(): string {
    const value = this.getValue();
    const name = this.getName();
    const error = validateInput(value, name);

    this.setProps({ error });

    return error;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Field;
