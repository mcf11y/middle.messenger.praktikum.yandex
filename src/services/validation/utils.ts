import { NAMES, TFieldNames } from "constants/fields";
import { ERROR_MESSAGES, REGEX } from "constants/validation-errors";

export const FIELD_REGEX = {
  [NAMES.login]: REGEX.login,
  [NAMES.password]: REGEX.password,
  [NAMES.passwordAgain]: REGEX.password,
  [NAMES.oldPassword]: REGEX.password,
  [NAMES.newPassword]: REGEX.password,
  [NAMES.newPasswordAgain]: REGEX.password,
  [NAMES.search]: REGEX.notEmpty,
  [NAMES.message]: REGEX.notEmpty,
  [NAMES.phone]: REGEX.phone,
  [NAMES.email]: REGEX.email,
  [NAMES.firstName]: REGEX.name,
  [NAMES.secondName]: REGEX.name,
  [NAMES.displayName]: REGEX.displayName,
};

export const FIELD_ERROR_MESSAGES = {
  [NAMES.login]: ERROR_MESSAGES.login,
  [NAMES.password]: ERROR_MESSAGES.password,
  [NAMES.passwordAgain]: ERROR_MESSAGES.password,
  [NAMES.oldPassword]: ERROR_MESSAGES.password,
  [NAMES.newPassword]: ERROR_MESSAGES.password,
  [NAMES.newPasswordAgain]: ERROR_MESSAGES.password,
  [NAMES.search]: ERROR_MESSAGES.empty,
  [NAMES.message]: ERROR_MESSAGES.empty,
  [NAMES.phone]: ERROR_MESSAGES.phone,
  [NAMES.email]: ERROR_MESSAGES.email,
  [NAMES.firstName]: ERROR_MESSAGES.name,
  [NAMES.secondName]: ERROR_MESSAGES.surname,
  [NAMES.displayName]: ERROR_MESSAGES.displayName,
};

export const getErrorMessage = (value: string, type: TFieldNames): string => {
  if (!FIELD_REGEX[type].test(value)) {
    return FIELD_ERROR_MESSAGES[type];
  }

  return "";
};
