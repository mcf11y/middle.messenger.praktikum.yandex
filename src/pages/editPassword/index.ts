import { IDS, NAMES } from "constants/fields";
import Profile from "containers/Profile";
import Block from "services/block";
import ProfileController from "services/controllers/profile-controller";
import { Connect } from "services/store";

import Avatar from "components/Avatar";
import Button from "components/Button";
import ProfileField, { EProfileField } from "components/ProfileField";

import template from "./template.hbs";
import { RESOURCE_URL } from "constants/urls";

const validation = ProfileController.editPasswordValidation;

const oldPasswordField = new ProfileField({
  fieldType: EProfileField.EDITABLE,
  fieldName: NAMES.oldPassword,

  validation,
});

const newPasswordField = new ProfileField({
  fieldType: EProfileField.EDITABLE,
  fieldName: NAMES.newPassword,

  validation,
});

const newPasswordAgain = new ProfileField({
  fieldType: EProfileField.EDITABLE,
  fieldName: NAMES.newPasswordAgain,

  validation,

  withDivider: false,
});

const submitButton = new Button({
  id: IDS[NAMES.submitBtn],
  variant: "primary",
  text: "Сохранить",
  width: 280,
});

const onSubmit = () => {
  ProfileController.updatePassword([NAMES.oldPassword, NAMES.newPassword]);
};

export class EditPassword extends Block {
  protected init(): void {}

  protected render(): DocumentFragment {
    const { avatarPath, userName } = this.props;
    const contentFields = [oldPasswordField, newPasswordField, newPasswordAgain];
    const footerFields = [submitButton];

    this.children.profile = new Profile({
      avatar: new Avatar({ size: "l", imageSrc: RESOURCE_URL + avatarPath }),
      userName,
      contentFields,
      footerFields,
      onSubmit,
    });

    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: any) {
  if (!state || !state.user) return;

  // eslint-disable-next-line consistent-return
  return {
    avatarPath: state.user.avatar,
    userName: state.user.display_name,
  };
}

export const EditPasswordPage = Connect(EditPassword, mapStateToProps);
