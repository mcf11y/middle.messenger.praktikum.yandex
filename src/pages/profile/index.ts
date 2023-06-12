import Avatar from "components/avatar";

import ProfileField, { EProfileField } from "components/profileField";
import Router from "services/router";

import Profile from "containers/profile";
import PAGE_URL from "constants/pageUrls";
import { NAMES } from "constants/fields";

const emailField = new ProfileField({
  fieldName: NAMES.email,
  fieldType: EProfileField.TEXT,
  value: "mock email...",
});

const loginField = new ProfileField({
  fieldName: NAMES.login,
  fieldType: EProfileField.TEXT,
  value: "mock login...",
});

const firstNameField = new ProfileField({
  fieldName: NAMES.firstName,
  fieldType: EProfileField.TEXT,
  value: "mock name...",
});

const secondNameField = new ProfileField({
  fieldName: NAMES.secondName,
  fieldType: EProfileField.TEXT,
  value: "mock second name...",
});

const displayNameField = new ProfileField({
  fieldName: NAMES.displayName,
  fieldType: EProfileField.TEXT,
  value: "IVAN",
});

const phoneField = new ProfileField({
  fieldName: NAMES.phone,
  fieldType: EProfileField.TEXT,
  value: "+7 (909) 967 30 30",
});

const PROFILE_FIELDS = [
  emailField,
  loginField,
  firstNameField,
  secondNameField,
  displayNameField,
  phoneField,
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
      Router.go(PAGE_URL.LOGIN);
    },
  }),
];

const ProfilePage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    userName: "mock username...",
    contentFields: PROFILE_FIELDS,
    footerFields: FOOTER_FIELDS,
  });

export default ProfilePage;
