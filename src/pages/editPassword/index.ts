import Avatar from "components/avatar";
import Button from "components/button";

import ProfileField from "components/profileField";

import Profile from "containers/profile";

const oldPasswordField = new ProfileField({
  leftContent: {
    id: "oldPassordLabel",
    type: "label",
    text: "Текущий пароль",
  },

  rightContent: {
    id: "oldPassword",
    type: "input",
    inputType: "password",
    text: "********",
    inputName: "oldPassword",
  },
});

const newPasswordField = new ProfileField({
  leftContent: {
    id: "newPassordLabel",
    type: "label",
    text: "Новый пароль",
  },

  rightContent: {
    id: "newPassword",
    type: "input",
    inputType: "password",
    text: "********",
    inputName: "newPassword",
  },
});

const newPasswordField2 = new ProfileField({
  leftContent: {
    id: "newPasswordLabel_2",
    type: "label",
    text: "Повторите пароль",
  },

  rightContent: {
    id: "newPassword_2",
    type: "input",
    inputType: "password",
    text: "********",
    inputName: "newPassword",
  },
  divider: false,
});

const submitButton = new Button({
  variant: "primary",
  text: "Сохранить",
  width: 280,
});

const EditPasswordPage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    contentFields: [oldPasswordField, newPasswordField, newPasswordField2],
    footerFields: [submitButton],
  });

export default EditPasswordPage;
