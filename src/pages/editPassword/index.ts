import Avatar from "components/avatar";
import Label from "components/label";
import Input from "components/input";
import Button from "components/button";

import CustomField from "components/customField";

import Profile from "containers/profile";

const oldPasswordInput = new Input({
  id: "oldPassword",
  type: "password",
  placeholder: "********",
  name: "oldPassword",
  reverseAlign: true,
});

const newPasswordInput = new Input({
  id: "newPassword",
  type: "password",
  placeholder: "********",
  name: "newPassword",
  reverseAlign: true,
});

const newPasswordInput2 = new Input({
  id: "newPassword_2",
  type: "password",
  placeholder: "********",
  name: "newPassword",
  reverseAlign: true,
});

const oldPasswordField = new CustomField({
  leftField: new Label({
    forId: "oldPassword",
    text: "Текущий пароль",
    isBlack: true,
  }),
  rightField: oldPasswordInput,
});

const newPasswordField = new CustomField({
  leftField: new Label({
    forId: "newPassword",
    text: "Новый пароль",
    isBlack: true,
  }),
  rightField: newPasswordInput,
});

const newPasswordField2 = new CustomField({
  leftField: new Label({
    forId: "newPassword_2",
    text: "Повторите новый пароль",
    isBlack: true,
  }),
  rightField: newPasswordInput2,
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
