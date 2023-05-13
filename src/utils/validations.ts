/* eslint-disable indent */
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/;

const NOT_EMPTY_REGEX = /.+/;

const NAME_REGEX = /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]*$/;

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const LOGIN_REGEX = /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/;

const PHONE_REGEX = /^\+?\d{1,3}[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}$/;

export enum InputValidateEnum {
  PASSWORD = "password",
  NAME = "name",
  EMAIL = "email",
  LOGIN = "login",
  NOT_EMPTY = "not-empty",
  PHONE = "phone",
}

export const validateInput = (
  value: string,
  type: InputValidateEnum | string
): string => {
  let errorMessage = "";

  switch (type) {
    case InputValidateEnum.PASSWORD:
      if (!PASSWORD_REGEX.test(value)) {
        errorMessage = "Invalid password";
      }
      break;
    case InputValidateEnum.NAME:
      if (!NAME_REGEX.test(value)) {
        errorMessage = "Invalid name";
      }
      break;
    case InputValidateEnum.EMAIL:
      if (!EMAIL_REGEX.test(value)) {
        errorMessage = "Invalid email";
      }
      break;
    case InputValidateEnum.LOGIN:
      if (!LOGIN_REGEX.test(value)) {
        errorMessage = "Invalid login";
      }
      break;
    case InputValidateEnum.NOT_EMPTY:
      if (!NOT_EMPTY_REGEX.test(value)) {
        errorMessage = "The field cannot be empty";
      }
      break;
    case InputValidateEnum.PHONE:
      if (!PHONE_REGEX.test(value)) {
        errorMessage = "Invalid phone";
      }
      break;
    default:
      if (!NAME_REGEX.test(value)) {
        errorMessage = "Invalid name";
      }
      break;
  }

  return errorMessage;
};
