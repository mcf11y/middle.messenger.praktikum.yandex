export type TFieldNames =
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
  | "create_chat"
  | "editProfile"
  | "editPassword"
  | "logout"
  | "submit"
  | "chat_name";

export type TFieldKeys =
  | "login"
  | "password"
  | "passwordAgain"
  | "firstName"
  | "secondName"
  | "email"
  | "phone"
  | "message"
  | "oldPassword"
  | "newPassword"
  | "newPasswordAgain"
  | "search"
  | "displayName"
  | "avatar"
  | "createChat"
  | "editProfileBtn"
  | "editPasswordBtn"
  | "logoutBtn"
  | "submitBtn"
  | "chatName";

export const NAMES: Record<TFieldKeys, TFieldNames> = {
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
  createChat: "create_chat",
  editProfileBtn: "editProfile",
  editPasswordBtn: "editPassword",
  logoutBtn: "logout",
  submitBtn: "submit",
  chatName: "create_chat",
};

export const LABELS = {
  [NAMES.login]: "Логин",
  [NAMES.password]: "Пароль",
  [NAMES.passwordAgain]: "Пароль (ещё раз)",
  [NAMES.firstName]: "Имя",
  [NAMES.secondName]: "Фамилия",
  [NAMES.email]: "Почта",
  [NAMES.phone]: "Телефон",
  [NAMES.displayName]: "Имя в чате",
  [NAMES.createChat]: "Имя чата",
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
  [NAMES.firstName]: "fld-first-name",
  [NAMES.secondName]: "fld-second-name",
  [NAMES.phone]: "fld-phone",
  [NAMES.email]: "fld-email",
  [NAMES.message]: "fld-message",
  [NAMES.oldPassword]: "fld-old-password",
  [NAMES.newPassword]: "fld-new-password",
  [NAMES.newPasswordAgain]: "fld-new-password_again",
  [NAMES.search]: "fld-search",
  [NAMES.displayName]: "fld-display-name",
  [NAMES.avatar]: "fld-avatar",
  [NAMES.createChat]: "fld-create-chat",
  [NAMES.editProfileBtn]: "fld-edit-profile-btn",
  [NAMES.editPasswordBtn]: "fld-edit-password-btn",
  [NAMES.logoutBtn]: "fld-logut-btn",
  [NAMES.submitBtn]: "fld-submit-btn",
  [NAMES.chatName]: "fld-chat-name",
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

  [NAMES.createChat]: "Введите название чата",

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
  [NAMES.chatName]: "text",
};
