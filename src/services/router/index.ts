import Block from "services/block";
import Route, { BlockConstructable } from "./Route";

class Router {
  private static __instance: Router;

  private _routes: Route[] = [];
  private _currentRoute: Nullable<Route> = null;

  private _history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this._routes = [];
    Router.__instance = this;
  }

  public use(pathname: string, block: BlockConstructable | Block): Router {
    const route = new Route(pathname, block, this.rootQuery);
    this._routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this._history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  public back() {
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }

  public reload() {
	  window.location.reload();
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}

export default new Router("#root");
