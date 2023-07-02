import { IDS, NAMES } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import Profile from "containers/Profile";
import Router from "services/router";
import ValidationMediator from "services/validation/validation-mediator";

import Avatar from "components/Avatar";
import Button from "components/Button";
import ProfileField, { EProfileField } from "components/ProfileField";

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
