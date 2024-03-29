import Block from "services/block";

import CenteredWrapper from "components/CenteredWrapper";

import LeftBar from "./LeftBar";
import template from "./Profile.hbs";
import ProfileForm from "./ProfileForm";

type Props = {
  avatar: Block;
  userName?: string;
  contentFields: Block[];
  footerFields: Block[];
  onSubmit?: () => void;
};

export default class BaseProfile extends Block {
  constructor({ avatar, userName, contentFields, footerFields, onSubmit }: Props) {
    const leftBarContainer = new LeftBar();
    const profileFormContainer = new CenteredWrapper({
      content: new ProfileForm({
        avatar,
        userName,
        contentFields,
        footerFields,
        onSubmit,
      }),
    });

    super({ leftBarContainer, profileFormContainer });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
