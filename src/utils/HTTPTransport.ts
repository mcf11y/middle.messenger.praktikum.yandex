enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type OptionsType = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<OptionsType, "method">;

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

const queryStringify = (queryObj: Record<string, unknown>): string => {
  const keys = Object.keys(queryObj);

  if (!keys.length) {
    return "";
  }

  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${queryObj[key]}${index < keys.length - 1 ? "&" : ""}`,
    "?"
  );
};

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  public request = (
    url: string,
    options: OptionsType = { method: METHOD.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
