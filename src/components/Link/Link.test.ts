import Link from "./index";
import { expect } from "chai";
import sinon from "sinon";

describe("Link", () => {
  it("should render", () => {
    new Link({ text: "link" });
  });

  it("element should return button", () => {
    const link = new Link({ text: "link" });
    const element = (link as any).element;

    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });

  it("should call on click cb after click", () => {
    const spy = sinon.spy();

    const link = new Link({ text: "link", onClick: spy });
    const element = (link as any).element as HTMLButtonElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
