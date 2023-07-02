import { TFieldNames } from "constants/fields";
import Block from "services/block";

import FormField from "components/FormField";

import template from "./AuthForm.hbs";

type Props = {
  title: Block;
  contentItems: Block[];
  submitBtn: Block;
  redirectBtn: Block;
  actionUrl?: string;
  onSubmit?: (data: Record<TFieldNames, string>) => void;
};

class AuthForm extends Block {
  constructor({ ...props }: Props) {
    super({
      ...props,
    });
  }

  public getFieldsValue(): Record<string, string> {
    const fields = this.children.contentItems;

    return (fields as FormField[]).reduce(
      (result, field) => ({
        ...result,
        [field.getName()]: field.getValue(),
      }),
      {}
    );
  }

  protected init(): void {
    this.props.events = {
      submit: (e: any) => {
        e.preventDefault();
        this.props?.onSubmit?.(this.getFieldsValue());
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
