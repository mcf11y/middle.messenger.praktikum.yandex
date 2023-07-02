import { NAMES, TFieldNames } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import { ERROR_MESSAGES } from "constants/validation-errors";
import AuthAPI, { ILoginRequestData } from "services/api/auth";
import Router from "services/router";
import ValidationMediator from "services/validation/validation-mediator";

class LoginUserController {
  _validation: ValidationMediator;

  constructor() {
    this._validation = new ValidationMediator(FORM_TYPE.LOGIN);
  }

  public get validation() {
    return this._validation;
  }

  public prepareDataToRequest(data: Record<TFieldNames, string>): ILoginRequestData {
    const { login, password } = data;

    return {
      login,
      password,
    };
  }

  public async login(data: Record<TFieldNames, string>) {
    try {
      this.validation.validateForm();

      if (!this.validation.isFormValid()) {
        throw new Error("Форма логина заполнена неверно");
      }

      const response = await AuthAPI.login(this.prepareDataToRequest(data));

      // не валидный логин или пароль
      if (response.status === 401) {
        this._validation.setFieldErrorMessage(
          NAMES.login,
          ERROR_MESSAGES.invalidPasswordOrLogin
        );
        this._validation.setFieldErrorMessage(
          NAMES.password,
          ERROR_MESSAGES.invalidPasswordOrLogin
        );
        return;
      }

      // юзер уже авторизован
      if (response.status === 400) {
        this._validation.setFieldErrorMessage(
          NAMES.email,
          ERROR_MESSAGES.userAlreadyInSystem
        );
        this._validation.setFieldErrorMessage(
          NAMES.login,
          ERROR_MESSAGES.userAlreadyInSystem
        );

        Router.go(PAGE_URL.INDEX);
        return;
      }

      if (response.status !== 200) {
        throw new Error("Ошибка авторизации");
      }

      Router.go(PAGE_URL.INDEX);
    } catch (error) {
      this._validation.setFieldErrorMessage(NAMES.login, ERROR_MESSAGES.loginError);

      console.error(error);
    }
  }
}

export default LoginUserController;
