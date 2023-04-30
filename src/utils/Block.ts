// @ts-nocheck
class Block {
  static EVENTS = {
    init: "init",
    mount: "mount",
    update: "update",
    render: "render",
  };

  protected props: Record<string, unknown>;

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @return {void}
   */

  constructor(tagName = "div", props: any = {}) {
    this._meta = {
      tagName,
      props,
      // ^?
    };
  }
}

class Circle {
  name: string;
  constructor() {
    this.name = "Circle";
  }

}

class Triangle {
  name: string;
  constructor() {
    this.name = "Triangle";
  }
}

class Dick {
  name: string;
  constructor() {
    this.name = "Soldier";
  }
}



const shapes = [new Circle(), new Triangle()];

shapes.push(new Dick());
shapes

