import { IDS, NAMES } from "constants/fields";
import { FORM_TYPE } from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import Profile from "containers/Profile";
import Router from "services/router";
import ValidationMediator from "services/validation/validation-mediator";

import Avatar from "components/Avatar";
import Button from "components/Button";
import ProfileField, { EProfileField } from "components/ProfileField";

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
