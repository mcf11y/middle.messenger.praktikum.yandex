import EventBus from "utils/EventBus";

export enum EStoreEvents {
  Updated = "updated",
}

export default class Store extends EventBus {
  private _state: Indexed = {};

  static _instance: Store;
  static STORE_NAME = "appStore";

  constructor() {
    if (Store._instance) {
      // eslint-disable-next-line no-constructor-return
      return Store._instance;
    }

    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store._instance = this;

    // for debug
    this.on(EStoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));
    });
  }

  public getState() {
    return this._state;
  }

  public removeState() {
    this._state = {};
    this.emit(EStoreEvents.Updated);
  }

  public set(id: string, value: unknown) {
    this._state[id] = value;
    this.emit(EStoreEvents.Updated);

    return this;
  }
}
