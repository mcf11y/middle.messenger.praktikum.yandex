import Title from "components/title";
import Block from "base-component";
import ProfileField from "components/profileField";
import template from "./profileForm.hbs";

type Props = {
  avatar: Block;
  userName?: Nullable<string>;
  contentFields: Block[];
  footerFields: Block[];
  onSubmit?: () => void;
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

    const validateResult = (this.children.contentFields as Block[]).reduce(
      (res, field) => {
        const er = (field as ProfileField)?.validateInputField();

        if (field instanceof ProfileField && er) {
          return [...res, er];
        }
        return [...res];
      },
      [] as any[]
    );

    if (validateResult.length === 0) {
      this.props?.onSubmit();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfileForm;
