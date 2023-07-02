import { IDS, NAMES, TFieldNames } from "constants/fields";
import PAGE_URL from "constants/page-urls";
import AuthForm from "containers/AuthForm";
import AuthAPI from "services/api/auth";
import UserLoginController from "services/controller/user-login";
import Router from "services/router";

import Button from "components/Button";
import CenteredLayout from "components/CenteredWrapper";
import FormField from "components/FormField";
import Title from "components/Title";

const userLoginController = new UserLoginController();

const loginField = new FormField({
  fieldName: NAMES.login,
  validation: userLoginController.validation,
});

const passwordField = new FormField({
  fieldName: NAMES.password,
  validation: userLoginController.validation,
});

(window as any).AUTH_API = AuthAPI;

const onAuthFormSubmit = (data: Record<TFieldNames, string>) => {
  console.log("FORM DATA", data);
  userLoginController.login(data);
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
};

const Login = () =>
  new CenteredLayout({
    content: new AuthForm(loginFormContext),
  });

export default Login;
