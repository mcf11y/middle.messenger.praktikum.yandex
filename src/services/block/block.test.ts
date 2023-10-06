import proxyquire from "proxyquire";
import { expect } from "chai";
import sinon from "sinon";
import type BlockType from "./Block";

describe("Block", () => {
  let eventBusMock: {
    on: sinon.SinonSpy<any[], any>;
    emit: sinon.SinonSpy<any[], any>;
  };
  let Block: typeof BlockType;

  beforeEach(() => {
    eventBusMock = {
      on: sinon.fake(),
      emit: sinon.fake(),
    };

    Block = proxyquire("./Block", {
      "../utils/event-bus": {
        EventBus: class {
          emit = eventBusMock.emit;
          on = eventBusMock.on;
        },
      },
    }).default;
  });

  afterEach(() => {
    eventBusMock = null as any;
    Block = null as any;
  });

  it("should call 'on' for all events on initialization", () => {
    class ComponentMock extends Block {}
    new ComponentMock({});

    expect(eventBusMock.on.calledWith("init")).to.eq(true);
    expect(eventBusMock.on.calledWith("flow:component-did-mount")).to.eq(true);
    expect(eventBusMock.on.calledWith("flow:component-did-update")).to.eq(true);
    expect(eventBusMock.on.calledWith("flow:render")).to.eq(true);
  });

  it("should fire init event on initialization", () => {
    class ComponentMock extends Block {}
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith("init")).to.eq(true);
  });

  it("should fire component-did-update event on props change", () => {
    class ComponentMock extends Block {}
    const myComponent = new ComponentMock({});

    myComponent.setProps({ name: 1 });
    expect(eventBusMock.emit.calledWith("flow:component-did-update")).to.eq(true);
  });

  it("should call componentDidUpdate with old props and new props", () => {
    class ComponentMock extends Block {}

    const myComponent = new ComponentMock({
      name: "test old",
    });

    myComponent.setProps({ name: "test new" });
    expect(
      eventBusMock.emit.calledWith(
        "flow:component-did-update",
        { name: "test old" },
        { name: "test new" },
      ),
    ).to.eq(true);
  });

  it("should fire component did mount on dispatchComponentDidMount", () => {
    class ComponentMock extends Block {}
    const myComponent = new ComponentMock({});

    myComponent.dispatchComponentDidMount();
    expect(eventBusMock.emit.calledWith("flow:component-did-mount")).to.eq(true);
  });

  it("should return true when oldProps and newProps are not equal", () => {
    class ComponentMock extends Block {}
    const myBlock = new ComponentMock({});
    const oldProps = { prop1: "old value", prop2: 123 };
    const newProps = { prop1: "new value", prop2: 456 };
    // @ts-ignore
    const result = myBlock.componentDidUpdate(oldProps, newProps);

    expect(result).to.be.true;
  });

  it("should return false when oldProps and newProps are both empty objects", () => {
    class ComponentMock extends Block {}
    const myBlock = new ComponentMock({});
    const oldProps = {};
    const newProps = {};
    // @ts-ignore
    const result = myBlock.componentDidUpdate(oldProps, newProps);

    expect(result).to.be.false;
  });

  it("should return true when oldProps and newProps have different number of properties", () => {
    class ComponentMock extends Block {}
    const myBlock = new ComponentMock({});
    const oldProps = { prop1: "value", prop2: 123 };
    const newProps = { prop1: "value", prop2: 123, prop3: true };
    // @ts-ignore
    const result = myBlock.componentDidUpdate(oldProps, newProps);

    expect(result).to.be.true;
  });

  it('should set element display to "block" when getContent() is not null', () => {
    class ComponentMock extends Block {}
    const block = new ComponentMock();
    const element = document.createElement("div");
    block.getContent = () => element;
    block.show();
    expect(element.style.display).to.equal("block");
  });

  it("should hide the content when invoked", () => {
    class ComponentMock extends Block {}
    const block = new ComponentMock({});
    const content = document.createElement("div");
    block.getContent = () => content;
    block.hide();
    expect(content.style.display).to.equal("none");
  });

  it("should not change the display style when invoked on already hidden content", () => {
    class ComponentMock extends Block {}
    const block = new ComponentMock({});
    const content = document.createElement("div");
    content.style.display = "none";
    block.getContent = () => content;
    block.hide();
    expect(content.style.display).to.equal("none");
  });
});
