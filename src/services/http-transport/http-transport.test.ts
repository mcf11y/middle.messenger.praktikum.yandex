import { SinonStub, createSandbox } from "sinon";
import HTTPTransport from "./http-transport";
import { use } from "chai";

const sinonChai = require("sinon-chai");

describe("HTTP transport", () => {
  const baseUrl = "";

  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport(baseUrl);
    request = sandbox
      .stub(http, "request" as keyof typeof http)
      .callsFake(() => Promise.resolve() as any);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should stringify query object for GET request where all paramters are strings", () => {
    http.get("", { data: { a: "1", b: "2" } });

    expect(request).calledWithMatch('?a=1&b=2', { a: "1", b: "2" });
  });
});
