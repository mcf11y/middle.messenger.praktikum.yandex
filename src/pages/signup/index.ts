import Button from "../../components/button";
import Title from "../../components/title";
import Field from "../../components/field";
import Input from "../../components/input";
import Label from "../../components/label";
import CenteredLayout from "../../components/centeredWrapper";

import AuthForm from "../../containers/authForm";

const signUpFormContext = {
  title: Title({
    text: "Регистрация",
    size: "l",
  }),
  contentItems: [
    Field({
      label: Label({
        forId: "email",
        text: "Почта",
      }),
      input: Input({
        id: "email",
        type: "text",
        placeholder: "Введите почту",
        name: "email",
      }),
    }),
    Field({
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
    }),
    Field({
      label: Label({
        forId: "first_name",
        text: "Имя",
      }),
      input: Input({
        id: "first_name",
        type: "text",
        placeholder: "Введите имя",
        name: "first_name",
      }),
    }),
    Field({
      label: Label({
        forId: "second_name",
        text: "Фамилия",
      }),
      input: Input({
        id: "second_name",
        type: "text",
        placeholder: "Введите фамилию",
        name: "second_name",
      }),
    }),
    Field({
      label: Label({
        forId: "phone",
        text: "Телефон",
      }),
      input: Input({
        id: "phone",
        type: "tel",
        placeholder: "Введите фамилию",
        name: "phone",
      }),
    }),
    Field({
      label: Label({
        forId: "password",
        text: "Пароль",
      }),
      input: Input({
        id: "password",
        type: "password",
        placeholder: "Введите пароль",
        name: "password",
      }),
    }),
    Field({
      label: Label({
        forId: "re-password",
        text: "Повторите пароль",
      }),
      input: Input({
        id: "re-password",
        type: "password",
        placeholder: "Повторно введите пароль",
        name: "password",
      }),
    }),
  ],
  submitBtn: Button({
    id: "login-submit-btn",
    variant: "primary",
    type: "submit",
    text: "Зарегистрироваться",
  }),
  redirectBtn: Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Уже есть аккаунт?",
  }),
  action: "",
};

const SignUp = () => CenteredLayout({
  content: AuthForm(signUpFormContext),
});

export default SignUp;
