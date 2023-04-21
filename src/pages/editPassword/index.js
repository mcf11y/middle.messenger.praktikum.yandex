import Avatar from "../../components/avatar";
import Title from "../../components/title";
import Input from "../../components/input";
import Button from "../../components/button";
import Link from "../../components/link";

import CustomField from "../../components/customField";

import Profile from "../../containers/profile";

const EDIT_PASSWORD_FIELDS = [
  CustomField({
    leftField: Title({
      text: "Текущий пароль",
      size: "xs",
    }),
    rightField: Input({
      type: "password",
      placeholder: "********",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Новый пароль",
      size: "xs",
    }),
    rightField: Input({
      type: "password",
      placeholder: "********",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Повторите новый пароль",
      size: "xs",
    }),
    rightField: Input({
      type: "password",
      placeholder: "********",
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
