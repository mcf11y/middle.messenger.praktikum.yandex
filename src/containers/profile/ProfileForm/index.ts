import Block from "services/block";

import Title from "components/Title";

import template from "./ProfileForm.hbs";

type Props = {
  avatar: Block;
  userName?: Nullable<string>;
  contentFields: Block[];
  footerFields: Block[];
  onSubmit?: () => void;
};

class ProfileForm extends Block<Props> {
  protected init(): void {
    this.props.events = {
      submit: this.onSubmit.bind(this),
    };

    if (this.props.userName) {
      this.children.title = new Title({ text: this.props.userName, size: "m" });
    }
  }

  public onSubmit(event: any): void {
    event.preventDefault();
    this.props?.onSubmit?.();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileForm;
