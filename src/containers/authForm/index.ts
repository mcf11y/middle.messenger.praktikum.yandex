import Block from "utils/Block";
import template from "./authForm.hbs";

type Props = {
  title: Block;
  contentItems: Block[];
  submitBtn: Block;
  redirectBtn: Block;
  actionUrl?: string;
  onSubmit?: () => void;
};

class AuthForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected init(): void {
    this.props.events = {
      submit: (e: any) => {
        e.preventDefault();
        this.props?.onSubmit();
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
