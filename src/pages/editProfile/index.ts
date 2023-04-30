import Avatar from "../../components/avatar";
import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";

import CustomField from "../../components/customField";

import Profile from "../../containers/profile";

const EDIT_PROFILE_FIELDS = [
  CustomField({
    leftField: Label({
      forId: "email",
      text: "Почта",
      isBlack: true,
    }),
    rightField: Input({
      id: "email",
      type: "text",
      value: "andrey@mail.ru",
      name: "email",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "login",
      text: "Логин",
      isBlack: true,
    }),
    rightField: Input({
      id: "login",
      type: "text",
      value: "andrey@mail.ru",
      name: "login",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "first_name",
      text: "Имя",
      isBlack: true,
    }),
    rightField: Input({
      id: "first_name",
      type: "text",
      value: "Иван",
      name: "first_name",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "second_name",
      text: "Фамилия",
      isBlack: true,
    }),
    rightField: Input({
      id: "second_name",
      type: "text",
      value: "Иванов",
      name: "second_name",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "display_name",
      text: "Имя в чате",
      isBlack: true,
    }),
    rightField: Input({
      id: "display_name",
      type: "text",
      value: "Иван",
      name: "display_name",
      reverseAlign: true,
    }),
  }),
  CustomField({
    leftField: Label({
      forId: "phone",
      text: "Телефон",
      isBlack: true,
    }),
    rightField: Input({
      id: "phone",
      type: "tel",
      value: "+7 (909) 967 30 30",
      name: "phone",
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

const EditProfilePage = () => Profile({
  avatar: Avatar({size: "l"}),
  contentFields: EDIT_PROFILE_FIELDS,
  footerFields: EDIT_PROFILE_FOOTER_FIELDS,
});

export default EditProfilePage;
