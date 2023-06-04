import Divider from "components/divider";
import Block from "base-component";
import Input from "components/input";
import ValidationMediator from "validation/ValidationMediator";
import {
  IDS,
  INPUT_TYPES,
  LABELS,
  PLACEHOLDERS,
  TFieldNames,
} from "constants/fields";
import Label from "components/label";
import Title from "components/title";
import Link from "components/link";
import template from "./profileField.hbs";

export enum EProfileField {
  TEXT,
  BTN,
  EDITABLE,
}

type Props = {
  fieldName: TFieldNames;
  fieldType: EProfileField;

  value?: string;
  btnOnClick?: (event: Event) => void;
  btnColor?: string;

  withDivider?: boolean;
  validation?: ValidationMediator;
};

class ProfileField extends Block {
  constructor({
    fieldType,
    fieldName,
    value,
    withDivider = true,
    validation,
    btnOnClick,
    btnColor,
  }: Props) {
    super({
      fieldName,
      fieldType,
      validation,
      value,
      withDivider,
      btnOnClick,
      btnColor,
    });
  }

  private _renderEditableField(field: TFieldNames) {
    this.props.validation?.subscribeField(field);

    this.children.leftField = new Label({
      forId: IDS[field],
      text: LABELS[field],
      isBlack: true,
    });

    this.children.rightField = new Input({
      id: IDS[field],
      name: field,
      placeholder: PLACEHOLDERS[field],
      type: INPUT_TYPES[field],
      reverseAlign: true,

      value: this.props.value,

      onInput: () => {
        this.props.validation?.validateField(field);
      },

      onBlur: () => {
        this.props.validation?.validateField(field);
      },
    });
  }

  private _renderTextField(field: TFieldNames) {
    this.children.leftField = new Title({
      text: LABELS[field],
      size: "xs",
    });

    this.children.rightField = new Title({
      text: this.props.value,
      size: "xs",
      color: "gray",
    });
  }

  private _renderButtonField(field: TFieldNames) {
    this.children.leftField = new Link({
      text: LABELS[field],
      onClick: this.props.btnOnClick?.bind(this),
      color: this.props.btnColor,
    });
  }

  protected init() {
    const fName = this.props.fieldName;
    this.props.id = IDS[fName];

    switch (this.props.fieldType) {
      case EProfileField.BTN:
        this._renderButtonField(fName);
        break;
      case EProfileField.TEXT:
        this._renderTextField(fName);
        break;
      case EProfileField.EDITABLE:
        this._renderEditableField(fName);
        break;
      default:
        break;
    }

    if (this.props.withDivider) {
      this.children.divider = new Divider();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileField;
