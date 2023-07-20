import { NAMES, TFieldNames } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import { ERROR_MESSAGES } from "constants/validation-errors";
import AuthAPI, {
  ILoginRequestData,
  ISignupRequestData,
} from "services/api/auth-api";
import Router from "services/router";
import store from "services/store";
import ValidationMediator from "services/validation/validation-mediator";

class AuthController {
  private _loginValidation: ValidationMediator;
  private _signupValidation: ValidationMediator;

  constructor() {
    this._loginValidation = new ValidationMediator(FORM_TYPE.LOGIN);
    this._signupValidation = new ValidationMediator(FORM_TYPE.SIGNUP);
  }

  public get signupValidation() {
    return this._signupValidation;
  }

  public get loginValidation() {
    return this._loginValidation;
  }

  public async login(data: Record<TFieldNames, string>) {
    const prepareDataToRequest = (): ILoginRequestData => {
      const { login, password } = data;

      return {
        login,
        password,
      };
    };

    try {
      this.loginValidation.validateForm();

      if (!this.loginValidation.isFormValid()) {
        return;
      }

      const response = await AuthAPI.login(prepareDataToRequest());

      // юзер уже авторизован
      if (response.status === 400) {
        this.loginValidation.setFieldErrorMessage(
          NAMES.login,
          response.data.reason ?? ERROR_MESSAGES.userAlreadyInSystem
        );
        this.loginValidation.setFieldErrorMessage(
          NAMES.password,
          response.data.reason ?? ERROR_MESSAGES.userAlreadyInSystem
        );

        setTimeout(() => Router.go(PAGE_URL.INDEX), 1500);
        return;
      }

      if (response.status !== 200) {
        this.loginValidation.setFieldErrorMessage(
          NAMES.login,
          response.data.reason ?? ERROR_MESSAGES.invalidPasswordOrLogin
        );
        this.loginValidation.setFieldErrorMessage(
          NAMES.password,
          response.data.reason ?? ERROR_MESSAGES.invalidPasswordOrLogin
        );
        return;
      }

      Router.go(PAGE_URL.INDEX);
    } catch (error) {
      this.loginValidation.setFieldErrorMessage(
        NAMES.login,
        error ?? ERROR_MESSAGES.loginError
      );

      console.error(error);
    }
  }

  public async signup(data: Record<TFieldNames, string>) {
    const prepareDataToRequest = (): ISignupRequestData => {
      const { email, login, first_name, second_name, phone, password } = data;

      return {
        first_name,
        second_name,
        login,
        email,
        password,
        phone,
      };
    };

    try {
      this.signupValidation.validateForm();

      if (!this.signupValidation.isFormValid()) {
        throw new Error("Форма регистрации заполнена неверно");
      }

      const response = await AuthAPI.signup(prepareDataToRequest());

      if (response.status === 409) {
        this.signupValidation.setFieldErrorMessage(
          NAMES.email,
          response.data.reason ?? ERROR_MESSAGES.userAlreadyInSystem
        );
        this.signupValidation.setFieldErrorMessage(
          NAMES.login,
          response.data.reason ?? ERROR_MESSAGES.userAlreadyInSystem
        );
        return;
      }

      if (response.status !== 200) {
        this.signupValidation.setFieldErrorMessage(
          NAMES.email,
          response.data.reason ?? "Problems with registration try later"
        );
        this.signupValidation.setFieldErrorMessage(
          NAMES.login,
          response.data.reason ?? "Problems with registration try later"
        );

        setTimeout(() => {
          Router.go(PAGE_URL.LOGIN);
        }, 1500);
      }

      await this.fetchUser()
        .then(() => Router.go(PAGE_URL.INDEX))
        .catch((error) => {
          console.error(error);

          Router.go(PAGE_URL.LOGIN);
        });
    } catch (error) {
      console.error(error);
    }
  }

  public async fetchUser() {
    const user = await AuthAPI.getLoggedUser();

    if (user.status !== 200) {
      throw new Error(
        user.data.reason ?? "Ошибка при получении данных пользователя"
      );
    }

    store.set("user", user.data);
  }

  public async logout() {
    const response = await AuthAPI.logout();

    if (response.status !== 200) {
      throw new Error(response.data.reason ?? "Ошибка при выходе из системы");
    }

    store.removeState();
    Router.go(PAGE_URL.LOGIN);
  }
}

export default new AuthController();
