import Block from "services/block";

export interface BlockConstructable<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}

// TODO: костыль для чатов - в будущем переделать
export const isPathEqual = (lhs: string, rhs: string): boolean => {
  if (lhs === rhs) {
    return true;
  }

  if (lhs.startsWith(rhs) && lhs[rhs.length] === "/") {
    return true;
  }

  return false;
};

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Root not found by selector "${query}"`);
  }

  root.innerHTML = "";
  root.append(block.getContent()!);

  return root;
};

class Route {
  private _block: Nullable<Block> = null;

  constructor(
    private pathname: string,
    private readonly blockClass: BlockConstructable | Block,
    private readonly query: string
  ) {}

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    this._block = null;
  }

  public hide() {
    if (this._block) {
      this._block.hide();
    }
  }

  public render() {
    if (!this._block) {
      this._block =
        // eslint-disable-next-line new-cap
        this.blockClass instanceof Block ? this.blockClass : new this.blockClass({});

      render(this.query, this._block);

      return;
    }

    this._block.show();
  }

  public match(pathname: string) {
    return isPathEqual(pathname, this.pathname);
  }
}

export default Route;
