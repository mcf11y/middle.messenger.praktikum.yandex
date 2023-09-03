import { nanoid } from "nanoid";

import { Observable as EventBus } from "./observable";

type PropsType = Record<string, any>;

type ChildrenType = Record<string, Block>;

type MetaType = {
  tagName: string;
  props: PropsType;
};

// This Block doesnt work correctly :(
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _id = nanoid(6);

  protected props: PropsType;
  protected children: ChildrenType;
  protected childrenList: Block[];

  private _context: PropsType;

  private _eventBus: () => EventBus;

  private _element: Nullable<HTMLElement> = null;
  private _meta: MetaType;

  private _setUpdate: boolean = false;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   */
  constructor(tagName: string = "div", props: PropsType = {}) {
    this._context = props;

    const {
      children,
      childrenList,
      props: nativeProps,
    } = this._getChildrenAndProps(props);

    this.children = this._makePropsProxy(children);
    this.childrenList = this._makePropsProxy(childrenList);
    this.props = this._makePropsProxy({ ...nativeProps, __id: this._id });

    this._meta = {
      tagName,
      props: nativeProps,
    };

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // @ts-ignore
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {}

  private _init() {
    this._element = this._createDocumentElement(this._meta?.tagName);

    this.init();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    if (this.childrenList.length) {
      this.childrenList.forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
  }

  protected componentDidMount() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: PropsType, _newProps: PropsType) {
    return true;
    // return (
    //   Object.keys(oldProps).length === Object.keys(newProps).length &&
    //   Object.keys(oldProps).every(
    //     (key) => newProps.hasOwnProperty(key) && oldProps[key] === newProps[key]
    //   )
    // );
  }

  private _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _render() {
    const block = this.render();

    this._removeEvents();
    this._element!.innerHTML = "";
    this._element!.append(block);
    this._addEvents();
    this._addAttribute();
  }

  protected compile(template: (props: PropsType) => string, props?: PropsType) {
    if (typeof props == "undefined") {
      props = this._context;
    }

    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id=${child._id}" />`;
    });

    if (this.childrenList.length) {
      this.childrenList.forEach((child) => {
        propsAndStubs[child._id] = `<div data-id=${child._id}" />`;
      });
    }

    const html = template(propsAndStubs);
    const fragment = document.createElement("template");
    fragment.innerHTML = html;

    const replace = (component: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
      if (!stub) {
        return;
      }

      stub.replaceWith(component.getContent()!);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, child]) => replace(child));

    if (this.childrenList.length) {
      this.childrenList.forEach((child) => replace(child));
    }

    return fragment.content;
  }

  public setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;

    const oldValue = { ...this.props };
    const { children, childrenList, props } = this._getChildrenAndProps(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (childrenList.length && childrenList.length === this.childrenList.length) {
      Object.assign(this.childrenList, childrenList);
    } else {
      this.childrenList.forEach((_child, index) => {
        _child = childrenList[index];
      });
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this._setUpdate) {
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  };

  private _getChildrenAndProps(childrenAndProps: PropsType) {
    const children: ChildrenType = {};
    const childrenList: Block[] = [];
    const props: PropsType = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof Block)
      ) {
        value.forEach((item) => {
          childrenList.push(item);
        });
      } else {
        props[key] = value;
      }
    });

    return { children, childrenList, props };
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);

    // @ts-ignore
    if (this.props.settings?.withInternalID) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  private _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, Callback<any>>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addAttribute() {
    const { attrs = {} } = this.props as { attrs: Record<string, string> };

    Object.entries(attrs).forEach(([key, value]) => {
      this._element!.setAttribute(key, value);
    });
  }

  private get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  public hide() {
    this.getContent()!.style.display = "none";
  }

  public show() {
    this.getContent()!.style.display = "block";
  }
}
