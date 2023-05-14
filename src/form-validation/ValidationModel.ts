// export enum InputValidateEnum {
//   PASSWORD = "password",
//   NAME = "name",
//   EMAIL = "email",
//   LOGIN = "login",
//   NOT_EMPTY = "not-empty",
//   PHONE = "phone",
// }

// export const validateInput = (
//   value: string,
//   type: InputValidateEnum | string
// ): string => {
//   let errorMessage = "";

//   switch (type) {
//     case InputValidateEnum.PASSWORD:
//       if (!PASSWORD_REGEX.test(value)) {
//         errorMessage = "Invalid password";
//       }
//       break;
//     case InputValidateEnum.NAME:
//       if (!NAME_REGEX.test(value)) {
//         errorMessage = "Invalid name";
//       }
//       break;
//     case InputValidateEnum.EMAIL:
//       if (!EMAIL_REGEX.test(value)) {
//         errorMessage = "Invalid email";
//       }
//       break;
//     case InputValidateEnum.LOGIN:
//       if (!LOGIN_REGEX.test(value)) {
//         errorMessage = "Invalid login";
//       }
//       break;
//     case InputValidateEnum.NOT_EMPTY:
//       if (!NOT_EMPTY_REGEX.test(value)) {
//         errorMessage = "The field cannot be empty";
//       }
//       break;
//     case InputValidateEnum.PHONE:
//       if (!PHONE_REGEX.test(value)) {
//         errorMessage = "Invalid phone";
//       }
//       break;
//     default:
//       if (!NAME_REGEX.test(value)) {
//         errorMessage = "Invalid name";
//       }
//       break;
//   }

//   return errorMessage;
// };
