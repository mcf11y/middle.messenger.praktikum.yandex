import {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
  createSandbox,
} from "sinon";
import HTTPTransport from "./http-transport";
import { expect, use } from "chai";
import sinon from "sinon";
// import proxyquire from "proxyquire";
// import sinon from 'sinon';

const sinonChai = require("sinon-chai");

// const {default: HTTPTransport } = proxyquire('./http-transport', {
//   "../utils/my-dash": {
//     queryStringify: sinon.fake()
//   }
// })

describe("HTTP transport", () => {
  const baseUrl = "";

  use(sinonChai);
  const sandbox = createSandbox();
  let http: any; //HTTPTransport;
  // let request: SinonStub<any>;
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];
  // let queryStringify: SinonStub;

  beforeEach(() => {
    // queryStringify = sinon.stub();
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    http = new HTTPTransport(baseUrl);

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    // request = sandbox
    //   .stub(http, "request" as keyof typeof http)
    //   .callsFake(() => Promise.resolve() as any);
  });

  afterEach(() => {
    sandbox.restore();
    requests = [];
  });

  it("should stringify query object for GET request where all paramters are strings", () => {
    http.get("", { data: { a: "1", b: "2" } });

    const [request] = requests;

    request.respond(404, {}, "error");

    expect(request).calledWithMatch("?a=1&b=2", { a: "1", b: "2" });
  });
});
