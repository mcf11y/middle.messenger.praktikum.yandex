import Avatar from "components/avatar";
import Title from "components/title";
import Link from "components/link";

import CustomField from "components/customField";

import Profile from "containers/profile";

const PROFILE_FIELDS = [
  new CustomField({
    leftField: new Title({
      text: "Почта",
      size: "xs",
    }),
    rightField: new Title({
      text: "andrey@mail.ru",
      size: "xs",
      color: "gray",
    }),
  }),
  new CustomField({
    leftField: new Title({
      text: "Логин",
      size: "xs",
    }),
    rightField: new Title({
      text: "andrey@mail.ru",
      size: "xs",
      color: "gray",
    }),
  }),
  new CustomField({
    leftField: new Title({
      text: "Имя",
      size: "xs",
    }),
    rightField: new Title({
      text: "Иван",
      size: "xs",
      color: "gray",
    }),
  }),
  new CustomField({
    leftField: new Title({
      text: "Фамилия",
      size: "xs",
    }),
    rightField: new Title({
      text: "Иванов",
      size: "xs",
      color: "gray",
    }),
  }),
  new CustomField({
    leftField: new Title({
      text: "Имя в чате",
      size: "xs",
    }),
    rightField: new Title({
      text: "Иван",
      size: "xs",
      color: "gray",
    }),
  }),
  new CustomField({
    leftField: new Title({
      text: "Телефон",
      size: "xs",
    }),
    rightField: new Title({
      text: "+7 (909) 967 30 30",
      size: "xs",
      color: "gray",
    }),
    divider: false,
  }),
];

const FOOTER_FIELDS = [
  new CustomField({
    leftField: new Link({
      text: "Изменить данные",
    }),
  }),
  new CustomField({
    leftField: new Link({
      text: "Изменить пароль",
    }),
  }),
  new CustomField({
    leftField: new Link({
      text: "Выйти",
      color: "red",
    }),
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
