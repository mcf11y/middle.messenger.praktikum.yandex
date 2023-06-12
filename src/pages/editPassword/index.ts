import Avatar from "components/avatar";
import Button from "components/button";

import ProfileField, { EProfileField } from "components/profileField";
import { IDS, NAMES } from "constants/fields";
import PAGE_URL from "constants/pageUrls";

import Profile from "containers/profile";
import Router from "services/router";
import { FORM_TYPE } from "constants/formTypes";
import ValidationMediator from "services/validation/ValidationMediator";

const validation = new ValidationMediator(FORM_TYPE.EDIT_PASSWORD);

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
  validation.validateForm();
  validation.isFormValid() && Router.go(PAGE_URL.PROFILE);
};

const EditPasswordPage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    contentFields: [oldPasswordField, newPasswordField, newPasswordAgain],
    footerFields: [submitButton],
    onSubmit,
  });

export default EditPasswordPage;
