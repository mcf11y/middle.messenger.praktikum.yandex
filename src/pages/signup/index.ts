import { IDS, NAMES, TFieldNames } from "constants/fields";
import PAGE_URL from "constants/page-urls";
import AuthForm from "containers/AuthForm";
import AuthController from "services/controllers/auth-controller";
import Router from "services/router";

import Button from "components/Button";
import CenteredLayout from "components/CenteredWrapper";
import Field from "components/FormField";
import Title from "components/Title";

const emailField = new Field({
  fieldName: NAMES.email,
  formMediator: AuthController.signupValidation,
});

const loginField = new Field({
  fieldName: NAMES.login,
  formMediator: AuthController.signupValidation,
});

const firstNameField = new Field({
  fieldName: NAMES.firstName,
  formMediator: AuthController.signupValidation,
});

const secondNameField = new Field({
  fieldName: NAMES.secondName,
  formMediator: AuthController.signupValidation,
});

const phoneField = new Field({
  fieldName: NAMES.phone,
  formMediator: AuthController.signupValidation,
});

const passwordField = new Field({
  fieldName: NAMES.password,
  formMediator: AuthController.signupValidation,
});

const passwordAgainField = new Field({
  fieldName: NAMES.passwordAgain,
  formMediator: AuthController.signupValidation,
});

const onAuthFormSubmit = (data: Record<TFieldNames, string>) => {
  AuthController.signup(data);
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
