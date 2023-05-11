import Avatar from "components/avatar";

import ProfileField from "components/profileField";

import Profile from "containers/profile";

const PROFILE_FIELDS = [
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Почта",
    },
    rightContent: {
      type: "text",
      text: "andrey@mail.ru",
    },
  }),
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Логин",
    },
    rightContent: {
      type: "text",
      text: "andrey@mail.ru",
    },
  }),
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Имя",
    },
    rightContent: {
      type: "text",
      text: "Иван",
    },
  }),
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Фамилия",
    },
    rightContent: {
      type: "text",
      text: "Иванов",
    },
  }),
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Имя в чате",
    },
    rightContent: {
      type: "text",
      text: "Иван",
    },
  }),
  new ProfileField({
    leftContent: {
      type: "text",
      text: "Телефон",
    },
    rightContent: {
      type: "text",
      text: "+7 (909) 967 30 30",
    },
    divider: false,
  }),
];

const FOOTER_FIELDS = [
  new ProfileField({
    leftContent: {
      type: "linkButton",
      text: "Изменить данные",
      onClick: () => {},
    },
  }),
  new ProfileField({
    leftContent: {
      type: "linkButton",
      text: "Изменить пароль",
      onClick: () => {},
    },
  }),
  new ProfileField({
    leftContent: {
      type: "redLinkButton",
      text: "Выйти",
      onClick: () => {},
    },
    divider: false,
  }),
];

const ProfilePage = () =>
  new Profile({
    avatar: new Avatar({ size: "l" }),
    userName: "Иван",
    contentFields: PROFILE_FIELDS,
    footerFields: FOOTER_FIELDS,
  });

export default ProfilePage;
