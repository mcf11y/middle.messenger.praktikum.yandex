import Avatar from "components/avatar";
import Button from "components/button";

import ProfileField, { EProfileField } from "components/profileField";
import { IDS, NAMES } from "constants/fields";
import FORM_TYPE from "constants/formTypes";
import PAGE_URL from "constants/pageUrls";

import Profile from "containers/profile";

import Router from "router";
import ValidationMediator from "validation/ValidationMediator";

const validation = new ValidationMediator(FORM_TYPE.EDIT_PROFILE);

const EDIT_PROFILE_FIELDS = [
  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.email,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.login,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.firstName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.secondName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.displayName,
    validation,
  }),

  new ProfileField({
    fieldType: EProfileField.EDITABLE,
    fieldName: NAMES.phone,
    validation,
    withDivider: false,
  }),

];

const EDIT_PROFILE_FOOTER_FIELDS = [
  new Button({
    id: IDS[NAMES.submitBtn],
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const onSubmit = () => {
  validation.validateForm();

  validation.isFormValid() && Router.go(PAGE_URL.PROFILE);
};

const EditProfilePage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    contentFields: EDIT_PROFILE_FIELDS,
    footerFields: EDIT_PROFILE_FOOTER_FIELDS,
    onSubmit,
  });

export default EditProfilePage;
