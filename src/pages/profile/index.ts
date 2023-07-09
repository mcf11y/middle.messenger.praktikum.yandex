import { NAMES } from "constants/fields";
import PAGE_URL from "constants/page-urls";
import Profile from "containers/Profile";
import Block from "services/block";
import AuthContoller from "services/controllers/auth-controller";
import Router from "services/router";
import { Connect } from "services/store";

import Avatar from "components/Avatar";
import ProfileField, { EProfileField } from "components/ProfileField";

import template from "./template.hbs";

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
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.email,
    value: email,
  }),

  new ProfileField({
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.login,
    value: login,
  }),

  new ProfileField({
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.firstName,
    value: firstName,
  }),

  new ProfileField({
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.secondName,
    value: secondName,
  }),

  new ProfileField({
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.displayName,
    value: userName,
  }),

  new ProfileField({
    fieldType: EProfileField.TEXT,
    fieldName: NAMES.phone,
    value: phone,
    withDivider: false,
  }),
];

const FOOTER_FIELDS = [
  new ProfileField({
    fieldType: EProfileField.BTN,
    fieldName: NAMES.editProfileBtn,

    btnOnClick: () => {
      Router.go(PAGE_URL.EDIT_PROFILE);
    },
  }),

  new ProfileField({
    fieldType: EProfileField.BTN,
    fieldName: NAMES.editPasswordBtn,

    btnOnClick: () => {
      Router.go(PAGE_URL.EDIT_PASSWORD);
    },
  }),

  new ProfileField({
    fieldType: EProfileField.BTN,
    fieldName: NAMES.logoutBtn,
    btnColor: "red",
    withDivider: false,

    btnOnClick: () => {
      AuthContoller.logout();
    },
  }),
];

class UserProfile extends Block {
  protected init(): void {}

  protected render(): DocumentFragment {
    const { avatarPath, userName, ...rest } = this.props;

    const contentFields = renderContentFields(rest);
    this.children.profile = new Profile({
      avatar: new Avatar({ size: "l", imageSrc: avatarPath }),
      userName,
      contentFields,
      footerFields: FOOTER_FIELDS,
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
export const ProfilePage = Connect(UserProfile, mapStateToProps);
