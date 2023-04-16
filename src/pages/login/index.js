import Button from "../../components/button";
import Field from "../../components/field";
import CenteredLayout from "../../components/centeredWrapper";

import AuthForm from "../../containers/authForm";

const loginFormContext = {
  title: "Вход",
  content: [
    Field({
      id: "login",
      type: "text",
      label: "Логин",
      placeholder: "Введите логин",
      name: "login",
    }),
    Field({
      id: "password",
      type: "password",
      label: "Пароль",
      placeholder: "Введите пароль",
      name: "password",
    }),
  ],
  submitBtn: Button({
    id: "login-submit-btn",
    view: "primary",
    type: "submit",
    text: "Авторизоваться",
  }),
  redirectBtn: Button({
    id: "redirect-btn",
    view: "link",
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
