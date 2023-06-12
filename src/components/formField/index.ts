/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from "services/block";
import Input from "components/input";
import Label from "components/label";
import ValidationMediator from "services/validation/ValidationMediator";
import {
  TFieldNames,
  IDS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPES,
} from "constants/fields";
import template from "./formField.hbs";

type Props = {
  fieldName: TFieldNames;

  style?: CSSStyleSheet;

  validation: ValidationMediator;
};

class FormField extends Block {
  constructor({...props }: Props) {
    super({ ...props });
  }

  protected init(): void {
    const fName = this.props.fieldName;

    this.props.validation?.subscribeField(fName);
    this.props.id = IDS[fName];

    this.children.label = new Label({
      forId: IDS[fName],
      text: LABELS[fName],
    });

    this.children.input = new Input({
      id: IDS[fName],
      name: fName,
      type: INPUT_TYPES[fName],
      placeholder: PLACEHOLDERS[fName],

      // onBlur: () => {
      //   this.props.validation?.validateField(fName);
      // },

      onInput: () => {
        this.props.validation?.validateField(fName);
      },
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

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default FormField;
