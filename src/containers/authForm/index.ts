import Field from "components/field";
import Block from "base-component";

import { ROUTES } from "utils/pageRoutes";

import Router from "router";
import template from "./authForm.hbs";

type Props = {
  title: Block;
  contentItems: Block[];
  submitBtn: Block;
  redirectBtn: Block;
  actionUrl?: string;
  onSubmit?: (data: any) => void;
};

class AuthForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public getFieldsValue(): Record<string, string> {
    const fields = this.children.contentItems;

    return (fields as Field[]).reduce(
      (result, field) => ({
        ...result,
        [field.getName()]: field.getValue(),
      }),
      {}
    );
  }

  public validateFields() {
    const fields = this.children.contentItems;

    return (fields as Field[]).reduce((result: any, field) => {
      const error = field.validateField();
      if (error) {
        return [...result, error];
      }
      return [...result];
    }, []);
  }

  protected init(): void {
    this.props.events = {
      submit: (e: any) => {
        e.preventDefault();
        const validateResult = this.validateFields();
        this.props?.onSubmit?.(this.getFieldsValue());

        if (validateResult.length === 0) {
          Router.go(ROUTES.INDEX);
        }
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
