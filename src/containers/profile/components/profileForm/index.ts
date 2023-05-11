import Title from "components/title";
import Block from "utils/Block";
import ProfileField from "components/profileField";
import template from "./profileForm.hbs";

type Props = {
  avatar: Block;
  userName?: Nullable<string>;
  contentFields: Block[];
  footerFields: Block[];
};

class ProfileForm extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

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
    (this.children.contentFields as Block[]).forEach((field) => {
      if (field instanceof ProfileField) {
        (field as ProfileField)?.validateInputField();
      }
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileForm;
