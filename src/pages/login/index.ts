import Button from "components/button";
import Title from "components/title";
import Field from "components/field";
import Input from "components/input";
import Label from "components/label";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

const loginField = new Field({
  label: new Label({
    forId: "login",
    text: "Логин",
  }),
  input: new Input({
    id: "login",
    type: "text",
    placeholder: "Введите логин",
    name: "login",
  }),
});

const passwordField = new Field({
  label: new Label({
    id: "login",
    text: "Пароль",
  }),
  input: new Input({
    id: "password",
    type: "password",
    placeholder: "Введите пароль",
    name: "password",
  }),
});

const loginFormContext = {
  title: new Title({
    text: "Вход",
    size: "l",
  }),
  contentItems: [loginField, passwordField],
  submitBtn: new Button({
    id: "login-submit-btn",
    variant: "primary",
    type: "submit",
    text: "Авторизоваться",
  }),
  redirectBtn: new Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Нет аккаунта?",
  }),
  actionUrl: "",
};

const Login = () =>
  new CenteredLayout({
    content: new AuthForm(loginFormContext),
  });

export default Login;
