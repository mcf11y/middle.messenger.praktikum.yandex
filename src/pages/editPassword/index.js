import Avatar from "../../components/avatar";
import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";

import CustomField from "../../components/customField";

import Profile from "../../containers/profile";

const EDIT_PASSWORD_FIELDS = [
  CustomField({
    leftField: Label({
      forId: "oldPassword",
      text: "Текущий пароль",
      size: "xs",
      black: true,
    }),
    rightField: Input({
      id: "oldPassword",
      type: "password",
      placeholder: "********",
      name: "oldPassword",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "newPassword",
      text: "Новый пароль",
      size: "xs",
      black: true,
    }),
    rightField: Input({
      id: "newPassword",
      type: "password",
      placeholder: "********",
      name: "newPassword",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "newPassword_2",
      text: "Повторите новый пароль",
      size: "xs",
      black: true,
    }),
    rightField: Input({
      id: "newPassword_2",
      type: "password",
      placeholder: "********",
      name: "newPassword",
      reverseAlign: true,
    }),
  }),
];

const EDIT_PASSWORD_FOOTER_FIELDS = [
  Button({
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const EditPasswordPage = () => {
  return Profile({
    avatar: Avatar({ size: "l" }),
    contentFields: EDIT_PASSWORD_FIELDS,
    footerFields: EDIT_PASSWORD_FOOTER_FIELDS,
  });
};

export default EditPasswordPage;
