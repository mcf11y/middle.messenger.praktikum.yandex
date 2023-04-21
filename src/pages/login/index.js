import Button from "../../components/button";
import Title from "../../components/title";
import Field from "../../components/field";
import Input from "../../components/input";
import Label from "../../components/label";
import CenteredLayout from "../../components/centeredWrapper";

import AuthForm from "../../containers/authForm";

const loginField = Field({
  label: Label({
    forId: "login",
    text: "Логин",
  }),
  input: Input({
    id: "login",
    type: "text",
    placeholder: "Введите логин",
    name: "login",
  }),
});

const passwordField = Field({
  label: Label({
    id: "login",
    text: "Пароль",
  }),
  input: Input({
    id: "password",
    type: "password",
    placeholder: "Введите пароль",
    name: "password",
  }),
});

const loginFormContext = {
  title: Title({
    text: "Вход",
    size: "l",
  }),
  contentItems: [
    loginField,
    passwordField,
  ],
  submitBtn: Button({
    id: "login-submit-btn",
    variant: "primary",
    type: "submit",
    text: "Авторизоваться",
  }),
  redirectBtn: Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Нет аккаунта?",
  }),
  action: "",
};

const Login = () => {
  return CenteredLayout({
    content: AuthForm(loginFormContext),
  });
};

export default Login;
