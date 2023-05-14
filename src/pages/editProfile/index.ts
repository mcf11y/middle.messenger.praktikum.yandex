import Avatar from "components/avatar";
import Button from "components/button";

import CustomField from "components/profileField";

import Profile from "containers/profile";
import { ROUTES } from "utils/pageRoutes";

import Router from "router";

const EDIT_PROFILE_FIELDS = [
  new CustomField({
    leftContent: {
      id: "emailLabel",
      type: "label",
      text: "Почта",
    },
    rightContent: {
      id: "email",
      type: "input",
      text: "andrey@mail.ru",
      inputType: "text",
      inputName: "email",
    },
  }),
  new CustomField({
    leftContent: {
      id: "loginLabel",
      type: "label",
      text: "Логин",
    },
    rightContent: {
      id: "login",
      type: "input",
      text: "andrey@mail.ru",
      inputType: "text",
      inputName: "login",
    },
  }),
  new CustomField({
    leftContent: {
      id: "nameLabel",
      type: "label",
      text: "Имя",
    },
    rightContent: {
      id: "login",
      type: "input",
      text: "Иван",
      inputType: "text",
      inputName: "first_name",
    },
  }),
  new CustomField({
    leftContent: {
      id: "surnameLabel",
      type: "label",
      text: "Фамилия",
    },
    rightContent: {
      id: "second_name",
      type: "input",
      text: "Иванов",
      inputType: "text",
      inputName: "second_name",
    },
  }),
  new CustomField({
    leftContent: {
      id: "chatNameLabel",
      type: "label",
      text: "Имя в чате",
    },
    rightContent: {
      id: "display_name",
      type: "input",
      text: "Иван",
      inputType: "text",
      inputName: "display_name",
    },
  }),
  new CustomField({
    leftContent: {
      id: "phoneLabel",
      type: "label",
      text: "Телефон",
    },
    rightContent: {
      id: "phone",
      type: "input",
      text: "+7 (909) 967 30 30",
      inputType: "tel",
      inputName: "phone",
    },
    divider: false,
  }),
];

const EDIT_PROFILE_FOOTER_FIELDS = [
  new Button({
    variant: "primary",
    text: "Сохранить",
    width: 280,
  }),
];

const onSubmit = () => {
  Router.go(ROUTES.PROFILE);
};

const EditProfilePage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    contentFields: EDIT_PROFILE_FIELDS,
    footerFields: EDIT_PROFILE_FOOTER_FIELDS,
    onSubmit,
  });

export default EditProfilePage;
