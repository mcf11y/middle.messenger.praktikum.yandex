import { NAMES, TFieldNames } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import { ERROR_MESSAGES } from "constants/validation-errors";
import AuthAPI, { ISignupRequestData } from "services/api/auth";
import Router from "services/router";
import ValidationMediator from "services/validation/validation-mediator";

class SignupUserController {
  private _validation: ValidationMediator;

  constructor() {
    this._validation = new ValidationMediator(FORM_TYPE.SINGUP);
  }

  public get validation() {
    return this._validation;
  }

  public prepareDataToRequest(
    data: Record<TFieldNames, string>
  ): ISignupRequestData {
    const { email, login, first_name, second_name, phone, password } = data;

    return {
      first_name,
      second_name,
      login,
      email,
      password,
      phone,
    };
  }

  public async signup(data: Record<TFieldNames, string>) {
    try {
      this.validation.validateForm();

      if (!this.validation.isFormValid()) {
        throw new Error("Форма регистрации заполнена неверно");
      }

      const response = await AuthAPI.signup(this.prepareDataToRequest(data));

      if (response.status === 409) {
        this._validation.setFieldErrorMessage(
          NAMES.email,
          ERROR_MESSAGES.userAlreadyExist
        );
        this._validation.setFieldErrorMessage(
          NAMES.login,
          ERROR_MESSAGES.userAlreadyExist
        );
        return;
      }

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
        this._validation.setFieldErrorMessage(
          NAMES.email,
          ERROR_MESSAGES.singUpError
        );

        throw new Error("Ошибка регистрации");
      }

      const user = await AuthAPI.getLoggedUser();

      if (user.status !== 200) {
        Router.go(PAGE_URL.LOGIN);

        throw new Error("Ошибка получения данных пользователя");
      }


      console.log("USER", user);

      Router.go(PAGE_URL.INDEX);
    } catch (error) {

      console.error(error);
    }
  }
}

export default SignupUserController;
