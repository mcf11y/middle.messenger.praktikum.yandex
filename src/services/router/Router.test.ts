import { BlockConstructable } from "./Route";
import Router from "./index";
import { expect } from "chai";
import sinon from "sinon";

describe("Router", () => {
  let root: HTMLElement;

  global.window.history.back = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement("div"));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  beforeEach(() => {
    Router.resetRouter();

    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  });

  it("use() should return Router instance", () => {
    const result = Router.use("/", BlockMock);

    expect(result).to.eq(Router);
  });

  it("should render a page on start", () => {
    Router.use("/", BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });

  describe(".go()", () => {
    it("should render a page on history back action", () => {
      Router.use("/", BlockMock).start();

      Router.go("/");
      expect(getContentFake.callCount).to.eq(3);
    });
  });

  describe(".back()", () => {
    it("should render a page on history back action", () => {
      Router.use("/", BlockMock).start();

      Router.back();
      expect(getContentFake.callCount).to.eq(5);
    });
  });

  describe(".forward()", () => {
    it("should render a page on history back action", () => {
      Router.use("/", BlockMock).start();

      Router.forward();
      expect(getContentFake.callCount).to.eq(7);
    });
  });

  describe(".reload()", () => {
    it("should render a page on history back action", () => {
      Router.use("/", BlockMock).start();

      Router.reload();
      expect(getContentFake.callCount).to.eq(8);
    });
  });
});
