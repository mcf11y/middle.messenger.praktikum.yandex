import Title from "components/title";
import Block from "utils/Block";
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
    if (this.props.userName) {
      this.children.title = new Title({ text: this.props.userName, size: "m" });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileForm;
