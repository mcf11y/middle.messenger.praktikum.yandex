const VALIDATION_REGEX = {
  PASSWORD: /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  LOGIN: /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/,
  NAME: /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]*$/,
  PHONE: /^\+?\d{1,3}[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}$/,
  MESSAGE: /.+/,
};

export default VALIDATION_REGEX;
