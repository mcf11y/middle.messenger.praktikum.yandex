/* eslint-disable indent */
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/;

const NOT_EMPTY_REGEX = /.+/;

const NAME_REGEX = /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]*$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(\.)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LOGIN_REGEX = /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/;

const PHONE_REGEX = /^(\+)?\d{10,15}$/g;

export enum InputValidateType {
  PASSWORD,
  NAME,
  EMAIL,
  LOGIN,
  NOT_EMPTY,
  PHONE,
}

export const validateInput = (value: string, type: InputValidateType) => {
  let isValid = true;

  switch (type) {
    case InputValidateType.PASSWORD:
      isValid = PASSWORD_REGEX.test(value);
      break;
    case InputValidateType.NAME:
      isValid = NAME_REGEX.test(value);
      break;
    case InputValidateType.EMAIL:
      isValid = EMAIL_REGEX.test(value);
      break;
    case InputValidateType.LOGIN:
      isValid = LOGIN_REGEX.test(value);
      break;
    case InputValidateType.NOT_EMPTY:
      isValid = NOT_EMPTY_REGEX.test(value);
      break;
    case InputValidateType.PHONE:
      isValid = PHONE_REGEX.test(value);
      break;
    default:
      isValid = false;
      break;
  }

  return isValid;
};
