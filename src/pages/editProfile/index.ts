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

const validation = ProfileController.editProfileValidation;

interface IContentFieldsProps {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  userName: string;
  phone: string;
}

const renderContentFields = ({
  email,
  login,
  firstName,
  secondName,
  userName,
  phone,
}: IContentFieldsProps) => [
  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.email,
    value: email,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.login,
    value: login,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.firstName,
    value: firstName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.secondName,
    value: secondName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.displayName,
    value: userName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.phone,
    value: phone,
    validation,
    withDivider: false,
  }),
];

const FOOTER_FIELDS = [
  new Button({
    id: IDS[NAMES.submitBtn],
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const onSubmit = () => {
  ProfileController.updateProfile([
    NAMES.email,
    NAMES.login,
    NAMES.firstName,
    NAMES.secondName,
    NAMES.displayName,
    NAMES.phone,
  ]);
};

class EditProfile extends Block {
  protected componentDidMount(): void {}

  protected render(): DocumentFragment {
    const { avatarPath, userName, ...rest } = this.props;

    const contentFields = renderContentFields({ userName, ...rest });
    this.children.profile = new Profile({
      avatar: new Avatar({
        size: "l",
        imageSrc: avatarPath ? RESOURCE_URL + avatarPath : undefined,
      }),
      userName,
      contentFields,
      footerFields: FOOTER_FIELDS,
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
    email: state.user.email,
    login: state.user.login,
    firstName: state.user.first_name,
    secondName: state.user.second_name,
    userName: state.user.display_name,
    phone: state.user.phone,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const EditProfilePage = Connect(EditProfile, mapStateToProps);
