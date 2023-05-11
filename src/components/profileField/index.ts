import Divider from "components/divider";
import Block from "utils/Block";
import Label from "components/label";
import Title from "components/title";
import Link from "components/link";
import Input from "components/input";
import { validateInput } from "utils/validations";
import template from "./profileField.hbs";

type Props = {
  leftContent?: {
    id?: string;
    type: "label" | "text" | "linkButton" | "redLinkButton";
    text: string;
    onClick?: (event: MouseEvent) => void;
  };
  rightContent?: {
    id?: string;
    type: "text" | "input";
    text?: string;
    inputType?: string;
    inputName?: string;

    onChange?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBLur?: (event: any) => void;
  };

  divider?: boolean;
};

class ProfileField extends Block {
  constructor({ leftContent, rightContent, divider = true }: Props) {
    super({ leftContent, rightContent, divider });
  }

  protected init() {


    if (this.props.divider) {
      this.children.divider = new Divider();
    }

    if (this.props.leftContent?.type === "label") {
      this.children.leftField = new Label({
        id: this.props.leftContent?.id,
        forId: this.props.rightContent?.id,
        text: this.props.leftContent?.text,
        isBlack: true,
      });
    }

    if (this.props.leftContent?.type === "text") {
      this.children.leftField = new Title({
        id: this.props.leftContent?.id,
        text: this.props.leftContent?.text,
        size: "xs",
      });
    }

    if (this.props.leftContent?.type === "linkButton") {
      this.children.leftField = new Link({
        text: this.props.leftContent?.text,
      });
    }

    if (this.props.leftContent?.type === "redLinkButton") {
      this.children.leftField = new Link({
        text: this.props.leftContent.text,
        color: "red",
      });
    }

    if (this.props.rightContent?.type === "text") {
      this.children.rightField = new Title({
        id: this.props.rightContent.id,
        text: this.props.rightContent?.text,
        size: "xs",
        color: "gray",
      });
    }

    if (this.props.rightContent?.type === "input") {
      this.children.rightField = new Input({
        id: this.props.rightContent?.id,
        type: this.props.rightContent?.inputType,
        name: this.props.rightContent?.inputName,
        placeholder: this.props.rightContent?.text,
        reverseAlign: true,

        onBlur: this.validateInputField.bind(this),
      });
    }
  }

  public validateInputField(): string {
    const field = this.children.rightField;

    if (field instanceof Input) {
      const value = field.getValue();
      const name = field.getName();
      const error = validateInput(value, name);

      this.setProps({ error });

      return error;
    }

    return "";
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileField;
