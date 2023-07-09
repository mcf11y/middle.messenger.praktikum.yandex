import { NAMES, TFieldNames } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import PAGE_URL from "constants/page-urls";
import UserAPI from "services/api/user-api";
import AuthContoller from "services/controllers/auth-controller";
import Router from "services/router";
import ValidationMediator from "services/validation/validation-mediator";

class ProfileController {
  private _editProfileValidation: ValidationMediator;
  private _editPasswordValidation: ValidationMediator;

  constructor() {
    this._editProfileValidation = new ValidationMediator(FORM_TYPE.EDIT_PROFILE);
    this._editPasswordValidation = new ValidationMediator(FORM_TYPE.EDIT_PASSWORD);
  }

  public get editProfileValidation() {
    return this._editProfileValidation;
  }

  public get editPasswordValidation() {
    return this._editPasswordValidation;
  }

  private getFieldsData = (
    fieldsName: TFieldNames[],
    validation: ValidationMediator
  ) =>
    fieldsName.reduce((acc, fieldName) => {
      acc[fieldName] = validation.getFieldValue(fieldName);
      return acc;
    }, {} as Record<TFieldNames, string>);

  public async updateProfile(fieldsName: TFieldNames[]) {
    try {
      this.editProfileValidation.validateForm();

      if (!this.editProfileValidation.isFormValid()) {
        throw new Error("Форма изменения данных пользователя заполнена неверно");
      }

      const data = this.getFieldsData(fieldsName, this.editProfileValidation);

      const response = await UserAPI.updateProfile({
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        display_name: data.display_name,
        email: data.email,
        phone: data.phone,
      });

      if (response.status !== 200) {
        this.editProfileValidation.setFieldErrorMessage(
          NAMES.email,
          response.data.reason ?? "Error when updating user data"
        );

        this.editProfileValidation.setFieldErrorMessage(
          NAMES.login,
          response.data.reason ?? "Error when updating user data"
        );

        throw new Error("Ошибка при обновлении данных пользователя");
      }

      await this.reloadUserAndGoToProfile();
    } catch (error) {
      console.error(error);
    }
  }

  public async updatePassword(fieldsName: TFieldNames[]) {
    try {
      this.editPasswordValidation.validateForm();

      if (!this.editPasswordValidation.isFormValid()) {
        throw new Error("Форма изменения пароля заполнена неверно");
      }

      const data = this.getFieldsData(fieldsName, this.editPasswordValidation);

      const response = await UserAPI.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (response.status !== 200) {
        this.editPasswordValidation.setFieldErrorMessage(
          NAMES.oldPassword,
          response.data.reason ?? "Error when updating password"
        );

        throw new Error("Ошибка при обновлении пароля");
        return;
      }

      await this.reloadUserAndGoToProfile();
    } catch (e) {
      console.error(e);
    }
  }

  private reloadUserAndGoToProfile = async () => {
    await AuthContoller.fetchUser()
      .then(() => Router.go(PAGE_URL.PROFILE))
      .catch((error) => {
        console.error(error);
        // Router.go(PAGE_URL.LOGIN);
      });
  };
}

export default new ProfileController();
