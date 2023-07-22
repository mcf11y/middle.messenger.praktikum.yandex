import { queryStringify } from "services/utils/my-dash";

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

type OptionsWithoutMethod<T> = Omit<OptionsType<T>, "method">;

class HTTPTransport {
  constructor(private baseUrl: string) {}

  public get = <T>(
    url: string,
    options: OptionsWithoutMethod<T> = {}
  ): Promise<XMLHttpRequest> =>
    this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  public put = <T>(
    url: string,
    options: OptionsWithoutMethod<T> = {}
  ): Promise<XMLHttpRequest> =>
    this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  public post = <T>(
    url: string,
    options: OptionsWithoutMethod<T> = {}
  ): Promise<XMLHttpRequest> =>
    this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  public delete = <T>(
    url: string,
    options: OptionsWithoutMethod<T> = {}
  ): Promise<XMLHttpRequest> =>
    this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  public request = <T>(
    url: string,
    options: OptionsType<T> = { method: METHOD.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, withCredentials } = options;

    const _url = this.baseUrl + url;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      if (withCredentials) {
        xhr.withCredentials = true;
      }

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
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
