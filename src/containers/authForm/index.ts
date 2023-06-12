import FormField from "components/formField";
import Block from "services/block";

import Router from "services/router";
import PAGE_URL from "constants/pageUrls";
import ValidationMediator from "services/validation/ValidationMediator";
import template from "./authForm.hbs";

type Props = {
  title: Block;
  contentItems: Block[];
  submitBtn: Block;
  redirectBtn: Block;
  actionUrl?: string;
  onSubmit?: (data: any) => void;

  validation?: ValidationMediator;
};

class AuthForm extends Block {
  constructor({...props }: Props) {
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
        const validation = this.props.validation;

        e.preventDefault();

        this.props?.onSubmit?.(this.getFieldsValue());

        if (validation) {
          validation.validateForm();
          validation.isFormValid() && Router.go(PAGE_URL.INDEX);
        } else {
          Router.go(PAGE_URL.INDEX);
        }
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
