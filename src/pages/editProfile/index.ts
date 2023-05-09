import Avatar from "components/avatar";
import Label from "components/label";
import Input from "components/input";
import Button from "components/button";

import CustomField from "components/customField";

import Profile from "containers/profile";

const EDIT_PROFILE_FIELDS = [
  new CustomField({
    leftField: new Label({
      forId: "email",
      text: "Почта",
      isBlack: true,
    }),
    rightField: new Input({
      id: "email",
      type: "text",
      value: "andrey@mail.ru",
      name: "email",
      reverseAlign: true,
    }),
  }),
  new CustomField({
    leftField: new Label({
      forId: "login",
      text: "Логин",
      isBlack: true,
    }),
    rightField: new Input({
      id: "login",
      type: "text",
      value: "andrey@mail.ru",
      name: "login",
      reverseAlign: true,
    }),
  }),
  new CustomField({
    leftField: new Label({
      forId: "first_name",
      text: "Имя",
      isBlack: true,
    }),
    rightField: new Input({
      id: "first_name",
      type: "text",
      value: "Иван",
      name: "first_name",
      reverseAlign: true,
    }),
  }),
  new CustomField({
    leftField: new Label({
      forId: "second_name",
      text: "Фамилия",
      isBlack: true,
    }),
    rightField: new Input({
      id: "second_name",
      type: "text",
      value: "Иванов",
      name: "second_name",
      reverseAlign: true,
    }),
  }),
  new CustomField({
    leftField: new Label({
      forId: "display_name",
      text: "Имя в чате",
      isBlack: true,
    }),
    rightField: new Input({
      id: "display_name",
      type: "text",
      value: "Иван",
      name: "display_name",
      reverseAlign: true,
    }),
  }),
  new CustomField({
    leftField: new Label({
      forId: "phone",
      text: "Телефон",
      isBlack: true,
    }),
    rightField: new Input({
      id: "phone",
      type: "tel",
      value: "+7 (909) 967 30 30",
      name: "phone",
      reverseAlign: true,
    }),
  }),
];

const EDIT_PROFILE_FOOTER_FIELDS = [
  new Button({
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const EditProfilePage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    contentFields: EDIT_PROFILE_FIELDS,
    footerFields: EDIT_PROFILE_FOOTER_FIELDS,
  });

export default EditProfilePage;
