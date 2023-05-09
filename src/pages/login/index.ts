import Button from "components/button";
import Title from "components/title";
import Field from "components/field";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

const loginField = new Field({
  id: "login",
  type: "text",
  fieldName: "Логин",
  placeholder: "Введите логин",
  inputName: "login",
});

const passwordField = new Field({
  id: "password",
  type: "password",
  fieldName: "Пароль",
  placeholder: "Введите пароль",
  inputName: "password",
});

const onAuthFormSubmit = (data: any) => {
  console.log(data);
};

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
  onSubmit: onAuthFormSubmit,
};

const Login = () =>
  new CenteredLayout({
    content: new AuthForm(loginFormContext),
  });

export default Login;
