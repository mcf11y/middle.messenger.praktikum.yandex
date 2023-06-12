import Button from "components/button";
import Title from "components/title";
import FormField from "components/formField";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

import Router from "services/router";
import { IDS, NAMES } from "constants/fields";
import PAGE_URL from "constants/pageUrls";
import ValidationMediator from "services/validation/ValidationMediator";
import FORM_TYPE from "constants/formTypes";

const loginValidation = new ValidationMediator(FORM_TYPE.LOGIN);

const loginField = new FormField({
  fieldName: NAMES.login,
  validation: loginValidation,
});

const passwordField = new FormField({
  fieldName: NAMES.password,
  validation: loginValidation,
});

const onAuthFormSubmit = (data: any) => {
  console.log("FORM DATA", data);
};

const loginFormContext = {
  title: new Title({
    text: "Вход",
    size: "l",
  }),

  contentItems: [loginField, passwordField],

  submitBtn: new Button({
    id: IDS[NAMES.submitBtn],
    variant: "primary",
    type: "submit",
    text: "Авторизоваться",
  }),

  redirectBtn: new Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Нет аккаунта?",
    onClick: () => {
      Router.go(PAGE_URL.SIGN_UP);
    },
  }),

  actionUrl: "",
  onSubmit: onAuthFormSubmit,
  validation: loginValidation,
};

const Login = () =>
  new CenteredLayout({
    content: new AuthForm(loginFormContext),
  });

export default Login;
