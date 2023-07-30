import { IDS, NAMES, TFieldNames } from "constants/fields";
import FORM_TYPE from "constants/form-types";
import Mediator from "services/utils/mediator";
import { isEmpty } from "services/utils/my-dash";

import { getErrorMessage } from "./utils";

type TValidaitonResult = Record<TFieldNames, string>;

const ERROR_LABEL_ID_POSTFIX = "-error-label";
const ERROR_BTN_CLASS = "btn-disabled";

class FormMediator {
  private _mediator: Mediator;
  private _formType?: FORM_TYPE;

  private _validationResult: TValidaitonResult = {} as TValidaitonResult;

  constructor(formType?: FORM_TYPE) {
    this._mediator = new Mediator();

    if (formType) this._formType = formType;
  }

  public setFormType(formType: FORM_TYPE) {
    this._formType = formType;
  }

  public getFormType() {
    return this._formType;
  }

  public getFieldValue(fieldName: TFieldNames) {
    return this._getFieldElement(fieldName)?.value ?? "";
  }

  private _getFieldElement(fieldName: TFieldNames): Maybe<HTMLInputElement> {
    return document.querySelectorAll(
      `[name="${fieldName}"]`
    )[0] as Maybe<HTMLInputElement>;
  }

  private _setFieldErrorMessage(fieldName: TFieldNames, errorMessage: string) {
    this._validationResult[fieldName] = errorMessage;

    const errorLabel = document.getElementById(
      `${IDS[fieldName]}${ERROR_LABEL_ID_POSTFIX}`
    ) as HTMLElement;

    if (errorLabel) {
      errorLabel.textContent = errorMessage;
    }
  }

  private _disableSubmitBtn() {
    const submitBtn = document.getElementById(
      IDS[NAMES.submitBtn]
    ) as HTMLButtonElement;

    if (this.isFormValid()) {
      submitBtn.disabled = false;
      submitBtn.classList.remove(ERROR_BTN_CLASS);
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add(ERROR_BTN_CLASS);
    }
  }

  private _validateField(fieldName: TFieldNames) {
    const value = this.getFieldValue(fieldName);

    const errorMessage = getErrorMessage(value, fieldName);

    this._setFieldErrorMessage(fieldName, errorMessage);
    this._disableSubmitBtn();
  }

  public setFieldErrorMessage(fieldName: TFieldNames, errorMessage: string) {
    this._setFieldErrorMessage(fieldName, errorMessage);
    this._disableSubmitBtn();
  }

  public subscribeToValidate(fieldName: TFieldNames, formType?: FORM_TYPE) {
    this._isFormTypeSet(formType);

    this._mediator.subscribe(formType ?? this._formType, fieldName, () =>
      this._validateField(fieldName)
    );
  }

  public unsubscribeToValidate(fieldName: TFieldNames, formType?: FORM_TYPE) {
    this._isFormTypeSet(formType);

    this._mediator.unsubscribe(formType ?? this._formType, fieldName);
  }

  public validateField(fieldName: TFieldNames, formType?: FORM_TYPE) {
    this._isFormTypeSet(formType);

    this._mediator.notify({
      channel: formType ?? this._formType,
      recipient: fieldName,
    });
  }

  public validateForm(formType?: FORM_TYPE) {
    this._isFormTypeSet(formType);

    this._validationResult = {} as TValidaitonResult;
    this._mediator.notify({ channel: formType ?? this._formType });
  }

  public getFieldErrorMessage(fieldName: TFieldNames): string {
    const error = this._validationResult[fieldName];
    if (error) return error;

    return "";
  }

  public getAllErrorMessages() {
    return this._validationResult;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public clearField(fieldName: TFieldNames) {
    if (this._getFieldElement(fieldName)?.value) {
      this._getFieldElement(fieldName)!.value = "";
    }
  }

  public clearFieldErrorMessage(fieldName: TFieldNames): void {
    if (this._validationResult[fieldName]) {
      this._validationResult[fieldName] = "";
    }
  }

  public clearAllErrors() {
    this._validationResult = {} as TValidaitonResult;
  }

  public isFormValid() {
    return (
      isEmpty(this._validationResult) ||
      !Object.values(this._validationResult).some((value) => value)
    );
  }

  private _isFormTypeSet(formType?: FORM_TYPE): asserts formType is FORM_TYPE {
    if (!formType && !this._formType)
      throw new Error("VALIDATION MEDIATOR - Form type is not set");
  }
}

export default FormMediator;
