export const ERROR_MESSAGES = {
  password: "Invalid password",
  email: "Invalid email",
  login: "Invalid login",
  phone: "Invalid phone",
  name: "Invalid name",
  surname: "Invalid surname",

  empty: "The field cannot be empty",
  required: "The field is required",

  invalidPasswordOrLogin: "Login or password is incorrect",
  userAlreadyExist: "User with this email or login already exists",
  userAlreadyInSystem: "User already in system",

  loginError: "Error while logging in, try again later",
  singUpError: "Error while signing up, try again later",
};

export const REGEX = {
  password: /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
  notEmpty: /.+/,
  name: /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]*$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  login: /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/,
  phone: /^\+?\d{1,3}[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}$/,
};
