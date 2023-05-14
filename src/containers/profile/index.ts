import CenteredWrapper from "components/centeredWrapper";
import Block from "base-component";
import LeftBar from "./components/leftBar";
import template from "./profile.hbs";
import ProfileForm from "./components/profileForm";

type Props = {
  avatar: Block;
  userName?: string;
  contentFields: Block[];
  footerFields: Block[];
  onSubmit?: () => void;
};

class Profile extends Block {
  constructor({ avatar, userName, contentFields, footerFields, onSubmit }: Props) {
    const leftBar = new LeftBar();
    const profileForm = new CenteredWrapper({
      content: new ProfileForm({
        avatar,
        userName,
        contentFields,
        footerFields,
        onSubmit,
      }),
    });

    super({ leftBar, profileForm });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Profile;
