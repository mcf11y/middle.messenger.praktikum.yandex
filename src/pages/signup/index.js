import Button from "../../components/button";
import Field from "../../components/field";
import CenteredLayout from '../../components/centeredWrapper';

import AuthForm from "../../containers/authForm";

const signUpFormContext = {
  title: "Регистрация",
  content: [
    Field({
      id: "email",
      type: "text",
      label: "Почта",
      placeholder: "Введите почту",
      name: "login",
    }),
    Field({
      id: "login",
      type: "text",
      label: "Логин",
      placeholder: "Придумайте логин",
      name: "login",
    }),
    Field({
      id: "name",
      type: "text",
      label: "Имя",
      placeholder: "Введите свое имя",
      name: "name",
    }),
    Field({
      id: "surname",
      type: "text",
      label: "Фамилия",
      placeholder: "Введите свою фамилию",
      name: "password",
    }),
    Field({
      id: "phone",
      type: "tel",
      label: "Телефон",
      placeholder: "Введите свой номер",
      name: "phone",
    }),
    Field({
      id: "password",
      type: "password",
      label: "Пароль",
      placeholder: "Введите пароль",
      name: "password",
    }),
    Field({
      id: "password-repeat",
      type: "password",
      label: "Пароль (еще раз)",
      placeholder: "Повтарите пароль пароль",
      name: "password-repeat",
    }),
  ],
  submitBtn: Button({
    id: "login-submit-btn",
    view: "primary",
    type: "submit",
    text: "Зарегистрироваться",
  }),
  redirectBtn: Button({
    id: "redirect-btn",
    view: "link",
    type: "button",
    text: "Уже есть аккаунт?",
  }),
  action: "",
};

const SignUp = () => {
  return CenteredLayout({
    content: AuthForm(signUpFormContext),
  });
};

export default SignUp;
