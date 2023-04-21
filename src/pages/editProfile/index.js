import Avatar from "../../components/avatar";
import Title from "../../components/title";
import Input from "../../components/input";
import Button from "../../components/button";
import Link from "../../components/link";

import CustomField from "../../components/customField";

import Profile from "../../containers/profile";

const EDIT_PROFILE_FIELDS = [
  CustomField({
    leftField: Title({
      text: "Почта",
      size: "xs",
    }),
    rightField: Input({
      type: "text",
      value: "andrey@mail.ru",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Логин",
      size: "xs",
    }),
    rightField: Input({
      type: "text",
      value: "andrey@mail.ru",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Имя",
      size: "xs",
    }),
    rightField: Input({
      type: "text",
      value: "Иван",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Фамилия",
      size: "xs",
    }),
    rightField: Input({
      type: "text",
      value: "Иванов",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Имя в чате",
      size: "xs",
    }),
    rightField: Input({
      type: "text",
      value: "Иван",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Телефон",
      size: "xs",
    }),
    rightField: Input({
      type: "tel",
      value: "+7 (909) 967 30 30",
      reverseAlign: true,
    }),
  }),
];

const EDIT_PROFILE_FOOTER_FIELDS = [
  Button({
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const EditProfilePage = () => {
  return Profile({
    avatar: Avatar({ size: "l" }),
    contentFields: EDIT_PROFILE_FIELDS,
    footerFields: EDIT_PROFILE_FOOTER_FIELDS,
  });
};

export default EditProfilePage;
