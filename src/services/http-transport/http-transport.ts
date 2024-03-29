import { queryStringify } from "../utils/my-dash";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type OptionsType<T> = {
  method: METHOD;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  data?: T | FormData;
  timeout?: number;
};

type HTTPMethod = <T = unknown>(
  url: string,
  options?: OptionsWithoutMethod<T>,
) => Promise<XMLHttpRequest>;

type OptionsWithoutMethod<T> = Omit<OptionsType<T>, "method">;

class HTTPTransport {
  constructor(private baseUrl: string) {}

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  public request = <T>(
    url: string,
    options: OptionsType<T> = { method: METHOD.GET },
    timeout = 5000,
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, withCredentials = false } = options;

    const _url = this.baseUrl + url;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${_url}${queryStringify(data)}` : _url);

      const headersArr = Object.entries(headers);
      if (headersArr.length) {
        headersArr.forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof window.FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
