import HTTPTransport from "services/http";
import { METHOD } from "services/http/transport";

export const BASE_URL = "https://ya-praktikum.tech";

export interface IResponse<T> {
  status: number;
  data: T & { reason?: string };
}

const parceJsonResponse = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return jsonStr;
  }
};

abstract class BaseAPI {
  private readonly __path: string;
  private _apiInstance?: HTTPTransport;

  constructor(path: string) {
    this.__path = `${BASE_URL}${path}`;
  }

  public get apiInstance() {
    if (!this._apiInstance) {
      this._apiInstance = new HTTPTransport(this.__path);
    }

    return this._apiInstance;
  }

  protected responseHandler<T>(req: XMLHttpRequest): IResponse<T> {
    return {
      status: req.status,
      data: parceJsonResponse(req.response),
    };
  }

  protected async httpFetch<T, P = unknown>(url: string, type: METHOD, data?: T) {
    switch (type) {
      case METHOD.GET:
        return this.apiInstance
          .get<T>(url, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.POST:
        return this.apiInstance
          .post(url, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.PUT:
        return this.apiInstance
          .put(url, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.DELETE:
        return this.apiInstance
          .delete(url, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      default:
        throw new Error("Unknown method");
    }
  }
}

export default BaseAPI;
