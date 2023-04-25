import Avatar from "../../components/avatar";
import Title from "../../components/title";
import Link from "../../components/link";

import CustomField from "../../components/customField";

import Profile from "../../containers/profile";

const PROFILE_FIELDS = [
  CustomField({
    leftField: Title({
      text: "Почта",
      size: "xs",
    }),
    rightField: Title({
      text: "andrey@mail.ru",
      size: "xs",
      color: "gray",
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Логин",
      size: "xs",
    }),
    rightField: Title({
      text: "andrey@mail.ru",
      size: "xs",
      color: "gray",
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Имя",
      size: "xs",
    }),
    rightField: Title({
      text: "Иван",
      size: "xs",
      color: "gray",
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Фамилия",
      size: "xs",
    }),
    rightField: Title({
      text: "Иванов",
      size: "xs",
      color: "gray",
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Имя в чате",
      size: "xs",
    }),
    rightField: Title({
      text: "Иван",
      size: "xs",
      color: "gray",
    }),
  }),
  CustomField({
    leftField: Title({
      text: "Телефон",
      size: "xs",
    }),
    rightField: Title({
      text: "+7 (909) 967 30 30",
      size: "xs",
      color: "gray",
    }),
  }),
];

const FOOTER_FIELDS = [
  CustomField({
    leftField: Link({
      text: "Изменить данные",
    }),
  }),
  CustomField({
    leftField: Link({
      text: "Изменить пароль",
    }),
  }),
  CustomField({
    leftField: Link({
      text: "Выйти",
      color: "red",
    }),
    divider: false,
  }),
];

const ProfilePage = () => {
  return Profile({
    avatar: Avatar({ size: "l" }),
    userName: "Иван",
    contentFields: PROFILE_FIELDS,
    footerFields: FOOTER_FIELDS,
  });
};

export default ProfilePage;
