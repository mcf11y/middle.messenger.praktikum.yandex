import { removeObjValue, setObjValue } from "services/utils/my-dash";
import { Observable as EventBus } from "services/utils/observable";

export enum EStoreEvents {
  Updated = "updated",
}

export default class Store extends EventBus {
  private _state: Indexed = {};

  static _instance: Store;
  static STORE_NAME = "app";

  constructor() {
    if (Store._instance) {
      // eslint-disable-next-line no-constructor-return
      return Store._instance;
    }

    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store._instance = this;

    (window as any).store = this;

    // for debug
    this.on(EStoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));
    });
  }

  public getState() {
    return this._state;
  }

  public removeStore() {
    this._state = {};

    this.emit(EStoreEvents.Updated);
  }

  public remove(path: string) {
    removeObjValue(this._state, path);

    this.emit(EStoreEvents.Updated);
  }

  public set(path: string, value: unknown) {
    setObjValue(this._state, path, value);

    this.emit(EStoreEvents.Updated);

    return this;
  }
}
