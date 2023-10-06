import HTTPTransport from "services/http-transport";
import { METHOD } from "services/http-transport/http-transport";

export const BASE_URL = "https://ya-praktikum.tech";

interface IBaseResponse<T> {
  status: number;
  data: T & { reason?: string };
}

const safeJsonParse = (jsonStr: string) => {
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

  protected responseHandler<T>(req: XMLHttpRequest): IBaseResponse<T> {
    return {
      status: req.status,
      data: safeJsonParse(req.response),
    };
  }

  protected async httpFetch<T, P = unknown>(url: string, type: METHOD, data?: T) {
    switch (type) {
      case METHOD.GET:
        return this.apiInstance
          .get<T>(url, {
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.POST:
        return this.apiInstance
          .post(url, {
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.PUT:
        return this.apiInstance
          .put(url, {
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      case METHOD.DELETE:
        return this.apiInstance
          .delete(url, {
            withCredentials: true,
            data,
          })
          .then((res) => this.responseHandler<P>(res));

      default:
        throw new Error("Unknown method");
    }
  }

  protected fetchFile = async (url: string, form: FormData) =>
    this.apiInstance
      .request(url, {
        method: METHOD.PUT,
        withCredentials: true,
        data: form,
      })
      .then((res) => this.responseHandler(res));
}

export default BaseAPI;
