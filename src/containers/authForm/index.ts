import Block from "utils/Block";
import Field from "components/field";
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
        this.validateFields();
        this.props?.onSubmit?.(this.getFieldsValue());
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
