import CenteredWrapper from "components/centeredWrapper";
import Block from "utils/Block";
import LeftBar from "./components/leftBar";
import template from "./profile.hbs";
import ProfileForm from "./components/profileForm";

type Props = {
  avatar: Block;
  userName?: string;
  contentFields: Block[];
  footerFields: Block[];
};

class Profile extends Block {
  constructor({ avatar, userName, contentFields, footerFields }: Props) {
    const leftBar = new LeftBar();
    const profileForm = new CenteredWrapper({
      content: new ProfileForm({
        avatar,
        userName,
        contentFields,
        footerFields,
      }),
    });

    super({ leftBar, profileForm });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Profile;
