import {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
  createSandbox,
} from "sinon";
import { assert, expect, use } from "chai";
import sinon from "sinon";
import proxyquire from "proxyquire";

import type HTTPTransportType from "./http-transport";
import { METHOD } from "./http-transport";

const sinonChai = require("sinon-chai");

const { default: HTTPTransport } = proxyquire("./http-transport", {
  "../utils/my-dash": {
    queryStringify: sinon.fake(),
  },
});

describe("HTTP transport", () => {
  const baseUrl = "";

  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransportType;

  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    // queryStringify = sinon.stub();
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;
    http = new HTTPTransport(baseUrl);

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    sandbox.restore();
    requests = [];
  });

  it(".get() should send GET request", () => {
    http.get("/user");

    const [request] = requests;
    expect(request.method).to.eq(METHOD.GET);
  });

  it(".post() should send POST request", () => {
    http.post("/data");

    const [request] = requests;
    expect(request.method).to.eq(METHOD.POST);
  });

  it(".delete() should send DELETE request", () => {
    http.delete("/user");

    const [request] = requests;
    expect(request.method).to.eq(METHOD.DELETE);
  });

  it(".put() should send PUT request", () => {
    http.put("/user");

    const [request] = requests;
    expect(request.method).to.eq(METHOD.PUT);
  });

  it("should set url and headers for requests", () => {
    const url = "/api/data";
    const options = {
      method: METHOD.GET,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer token",
      },
      withCredentials: false,
      data: undefined,
      timeout: undefined,
    };

    http.request(url, options);
    const [request] = requests;
    const headers = request.requestHeaders;
    assert.equal(request.url, `${baseUrl}${url}`);
    expect(headers).to.have.property(
      "Content-Type",
      "application/json;charset=utf-8",
    );
    expect(headers).to.have.property("Authorization", "Bearer token");
  });

  it("should set withCredentials to true when options.withCredentials is true", () => {
    const url = "/api/data";
    const options = {
      method: METHOD.GET,
      headers: {},
      withCredentials: true,
      data: undefined,
      timeout: undefined,
    };

    http.request(url, options);

    const [request] = requests;
    expect(request.withCredentials).to.be.eq(true);
  });
});
