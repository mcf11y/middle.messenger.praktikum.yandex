import { IDS, NAMES, TFieldNames } from "constants/fields";
import PAGE_URL from "constants/page-urls";
import AuthForm from "containers/AuthForm";
import SignupUserController from "services/controller/user-signup";
import Router from "services/router";

import Button from "components/Button";
import CenteredLayout from "components/CenteredWrapper";
import Field from "components/FormField";
import Title from "components/Title";

const userSignupController = new SignupUserController();

const emailField = new Field({
  fieldName: NAMES.email,
  validation: userSignupController.validation,
});

const loginField = new Field({
  fieldName: NAMES.login,
  validation: userSignupController.validation,
});

const firstNameField = new Field({
  fieldName: NAMES.firstName,
  validation: userSignupController.validation,
});

const secondNameField = new Field({
  fieldName: NAMES.secondName,
  validation: userSignupController.validation,
});

const phoneField = new Field({
  fieldName: NAMES.phone,
  validation: userSignupController.validation,
});

const passwordField = new Field({
  fieldName: NAMES.password,
  validation: userSignupController.validation,
});

const passwordAgainField = new Field({
  fieldName: NAMES.passwordAgain,
  validation: userSignupController.validation,
});

const onAuthFormSubmit = (data: Record<TFieldNames, string>) => {
  userSignupController.signup(data);
  console.log("FORM DATA", data);
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
    passwordAgainField,
  ],

  submitBtn: new Button({
    id: IDS[NAMES.submitBtn],
    variant: "primary",
    type: "submit",
    text: "Зарегистрироваться",
  }),

  redirectBtn: new Button({
    id: "redirect-btn",
    variant: "link",
    type: "button",
    text: "Уже есть аккаунт?",
    onClick: () => {
      Router.go(PAGE_URL.LOGIN);
    },
  }),

  action: "",

  onSubmit: onAuthFormSubmit,
};

const SignUp = () =>
  new CenteredLayout({
    content: new AuthForm(signUpFormContext),
  });

export default SignUp;
