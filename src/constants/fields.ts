type TField =
  | "login"
  | "password"
  | "password_again"
  | "first_name"
  | "second_name"
  | "email"
  | "phone"
  | "message"
  | "oldPassword"
  | "newPassword"
  | "newPassword_again"
  | "search"
  | "display_name"
  | "avatar"
  | "editProfile"
  | "editPassword"
  | "logout"
  | "submit";

export const NAMES: Record<string, TField> = {
  login: "login",
  password: "password",
  passwordAgain: "password_again",
  firstName: "first_name",
  secondName: "second_name",
  email: "email",
  phone: "phone",
  message: "message",
  oldPassword: "oldPassword",
  newPassword: "newPassword",
  newPasswordAgain: "newPassword_again",
  search: "search",
  displayName: "display_name",
  avatar: "avatar",

  editProfileBtn: "editProfile",
  editPasswordBtn: "editPassword",
  logoutBtn: "logout",

  submitBtn: "submit",
};

export type TFieldKeys = keyof typeof NAMES;
export type TFieldNames = (typeof NAMES)[TFieldKeys];

export const LABELS = {
  [NAMES.login]: "Логин",
  [NAMES.password]: "Пароль",
  [NAMES.passwordAgain]: "Пароль (ещё раз)",
  [NAMES.firstName]: "Имя",
  [NAMES.secondName]: "Фамилия",
  [NAMES.email]: "Почта",
  [NAMES.phone]: "Телефон",
  [NAMES.displayName]: "Имя в чате",
  [NAMES.avatar]: "Аватар",
  [NAMES.oldPassword]: "Старый пароль",
  [NAMES.newPassword]: "Новый пароль",
  [NAMES.newPasswordAgain]: "Повторите новый пароль",

  [NAMES.editProfileBtn]: "Изменить данные",
  [NAMES.editPasswordBtn]: "Изменить пароль",
  [NAMES.logoutBtn]: "Выйти",
};

export const IDS = {
  [NAMES.login]: "fld-login",
  [NAMES.password]: "fld-password",
  [NAMES.passwordAgain]: "fld-password_again",
  [NAMES.oldPassword]: "fld-old-password",
  [NAMES.newPassword]: "fld-new-password",
  [NAMES.newPasswordAgain]: "fld-new-password_again",
  [NAMES.search]: "fld-search",
  [NAMES.message]: "fld-message",
  [NAMES.phone]: "fld-phone",
  [NAMES.email]: "fld-email",
  [NAMES.firstName]: "fld-first-name",
  [NAMES.secondName]: "fld-second-name",
  [NAMES.displayName]: "field-display-name",

  [NAMES.submitBtn]: "fld-submit-btn",

  [NAMES.editProfileBtn]: "fld-edit-profile-btn",
  [NAMES.editPasswordBtn]: "fld-edit-password-btn",

  [NAMES.logoutBtn]: "fld-logut-btn",
};

export const PLACEHOLDERS = {
  [NAMES.login]: "Введите логин",
  [NAMES.password]: "Введите пароль",
  [NAMES.email]: "Введите почту",
  [NAMES.firstName]: "Введите имя",
  [NAMES.secondName]: "Введите фамилию",
  [NAMES.phone]: "Введите телефон",
  [NAMES.passwordAgain]: "Повторно введите пароль",

  [NAMES.message]: "Сообщение",

  [NAMES.displayName]: "Введите имя в чате",

  [NAMES.oldPassword]: "**********",
  [NAMES.newPassword]: "**********",
  [NAMES.newPasswordAgain]: "************",
};

export const INPUT_TYPES = {
  [NAMES.login]: "text",
  [NAMES.password]: "password",
  [NAMES.passwordAgain]: "password",
  [NAMES.oldPassword]: "password",
  [NAMES.newPassword]: "password",
  [NAMES.newPasswordAgain]: "password",
  [NAMES.search]: "search",
  [NAMES.message]: "text",
  [NAMES.phone]: "tel",
  [NAMES.email]: "email",
  [NAMES.firstName]: "text",
  [NAMES.secondName]: "text",
  [NAMES.displayName]: "text",
  [NAMES.avatar]: "file",
};
