import FORM_TYPE from "constants/formTypes";
import { isEmpty } from "utils/mydash";
import Mediator from "utils/Mediator";
import { IDS, NAMES, TFieldNames } from "constants/fields";
import { getErrorMessage } from "./utils";

type TValidaitonResult = Record<TFieldNames, string>;

const ERROR_LABEL_ID_POSTFIX = "-error-label";
const ERROR_BTN_CLASS = "btn-disabled";

class ValidationMediator {
  private _mediator: Mediator;
  private _formType: FORM_TYPE;

  private _validationResult: TValidaitonResult = {} as TValidaitonResult;

  constructor(formType: FORM_TYPE) {
    this._mediator = new Mediator();
    this._formType = formType;
  }

  private _validateField(fieldName: TFieldNames) {
    const value = (
      document.querySelectorAll(`[name="${fieldName}"]`)[0] as HTMLInputElement
    )?.value;

    const errorMessage = getErrorMessage(value, fieldName);

    this._validationResult[fieldName] = errorMessage;

    const errorLabel = document.getElementById(
      `${IDS[fieldName]}${ERROR_LABEL_ID_POSTFIX}`
    ) as HTMLElement;

    if (errorLabel) {
      errorLabel.textContent = errorMessage;
    }

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

  public subscribeField(fieldName: TFieldNames) {
    this._mediator.subscribe(this._formType, fieldName, () =>
      this._validateField(fieldName)
    );
  }

  public unsubscribeField(fieldName: TFieldNames) {
    this._mediator.unsubscribe(this._formType, fieldName);
  }

  public validateField(fieldName: TFieldNames) {
    this._mediator.notify({ channel: this._formType, recipient: fieldName });
  }

  public validateForm() {
    this._validationResult = {} as TValidaitonResult;

    this._mediator.notify({ channel: this._formType });
  }

  public getFieldErrorMessage(fieldName: TFieldNames): string {
    const error = this._validationResult[fieldName];
    if (error) return error;

    return "";
  }

  public getAllErrorMessages() {
    return this._validationResult;
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
}

export default ValidationMediator;
