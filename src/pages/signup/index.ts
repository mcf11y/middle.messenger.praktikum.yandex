import Button from "components/button";
import Title from "components/title";
import Field from "components/field";
import Input from "components/input";
import Label from "components/label";
import CenteredLayout from "components/centeredWrapper";

import AuthForm from "containers/authForm";

const signUpFormContext = {
  title: new Title({
    text: "Регистрация",
    size: "l",
  }),
  contentItems: [
    new Field({
      label: new Label({
        forId: "email",
        text: "Почта",
      }),
      input: new Input({
        id: "email",
        type: "text",
        placeholder: "Введите почту",
        name: "email",
      }),
    }),
    new Field({
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
    }),
    new Field({
      label: new Label({
        forId: "first_name",
        text: "Имя",
      }),
      input: new Input({
        id: "first_name",
        type: "text",
        placeholder: "Введите имя",
        name: "first_name",
      }),
    }),
    new Field({
      label: new Label({
        forId: "second_name",
        text: "Фамилия",
      }),
      input: new Input({
        id: "second_name",
        type: "text",
        placeholder: "Введите фамилию",
        name: "second_name",
      }),
    }),
    new Field({
      label: new Label({
        forId: "phone",
        text: "Телефон",
      }),
      input: new Input({
        id: "phone",
        type: "tel",
        placeholder: "Введите фамилию",
        name: "phone",
      }),
    }),
    new Field({
      label: new Label({
        forId: "password",
        text: "Пароль",
      }),
      input: new Input({
        id: "password",
        type: "password",
        placeholder: "Введите пароль",
        name: "password",
      }),
    }),
    new Field({
      label: new Label({
        forId: "re-password",
        text: "Повторите пароль",
      }),
      input: new Input({
        id: "re-password",
        type: "password",
        placeholder: "Повторно введите пароль",
        name: "password",
      }),
    }),
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
};

const SignUp = () =>
  new CenteredLayout({
    content: new AuthForm(signUpFormContext),
  });

export default SignUp;
