import Button from "components/button";
import Title from "components/title";
import Field from "components/formField";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

import Router from "services/router";
import PAGE_URL from "constants/pageUrls";
import { IDS, NAMES } from "constants/fields";
import ValidationMediator from "services/validation/ValidationMediator";
import FORM_TYPE from "constants/formTypes";

const signupValidation = new ValidationMediator(FORM_TYPE.SINGUP);

const emailField = new Field({
  fieldName: NAMES.email,
  validation: signupValidation,
});

const loginField = new Field({
  fieldName: NAMES.login,
  validation: signupValidation,
});

const firstNameField = new Field({
  fieldName: NAMES.firstName,
  validation: signupValidation,
});

const secondNameField = new Field({
  fieldName: NAMES.secondName,
  validation: signupValidation,
});

const phoneField = new Field({
  fieldName: NAMES.phone,
  validation: signupValidation,
});

const passwordField = new Field({
  fieldName: NAMES.password,
  validation: signupValidation,
});

const passwordAgainField = new Field({
  fieldName: NAMES.passwordAgain,
  validation: signupValidation,
});

const onAuthFormSubmit = (data: any) => {
  console.log("FORM DATA", data);
};

const signUpFormContext = {
  title: new Title({
    text: "Регистрация",
    size: "l",
  }),
  contentItems: [
    emailField,
    loginField,
    firstNameField,
    secondNameField,
    phoneField,
    passwordField,
    passwordAgainField,
  ],
  submitBtn: new Button({
    id: IDS[NAMES.submitBtn],
    variant: "primary",
    type: "submit",
    text: "Зарегистрироваться",
  }),
  redirectBtn: new Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Уже есть аккаунт?",
    onClick: () => {
      Router.go(PAGE_URL.LOGIN);
    },
  }),
  action: "",
  onSubmit: onAuthFormSubmit,

  validation: signupValidation,
};

const SignUp = () =>
  new CenteredLayout({
    content: new AuthForm(signUpFormContext),
  });

export default SignUp;
