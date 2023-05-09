import Button from "components/button";
import Title from "components/title";
import Field from "components/field";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

const emailField = new Field({
  id: "email",
  type: "text",
  fieldName: "Почта",
  placeholder: "Введите почту",
  inputName: "email",
});

const loginField = new Field({
  id: "login",
  type: "text",
  fieldName: "Логин",
  placeholder: "Введите логин",
  inputName: "login",
});

const firstNameField = new Field({
  id: "first_name",
  type: "text",
  fieldName: "Имя",
  placeholder: "Введите имя",
  inputName: "first_name",
});

const secondNameField = new Field({
  id: "second_name",
  type: "text",
  fieldName: "Фамилия",
  placeholder: "Введите фамилию",
  inputName: "second_name",
});

const phoneField = new Field({
  id: "phone",
  type: "tel",
  fieldName: "Телефон",
  placeholder: "Введите телефон",
  inputName: "phone",
});

const passwordField = new Field({
  id: "password",
  type: "password",
  fieldName: "Пароль",
  placeholder: "Введите пароль",
  inputName: "password",
});

const rePasswordField = new Field({
  id: "re-password",
  type: "password",
  fieldName: "Повторите пароль",
  placeholder: "Повторно введите пароль",
  inputName: "password",
});

const onAuthFormSubmit = (data: any) => {
  console.log(data);
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
    rePasswordField,
  ],
  submitBtn: new Button({
    id: "login-submit-btn",
    variant: "primary",
    type: "submit",
    text: "Зарегистрироваться",
  }),
  redirectBtn: new Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Уже есть аккаунт?",
  }),
  action: "",
  onSubmit: onAuthFormSubmit,
};

const SignUp = () =>
  new CenteredLayout({
    content: new AuthForm(signUpFormContext),
  });

export default SignUp;
