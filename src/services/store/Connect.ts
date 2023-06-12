import Block from "services/block/Block";
import Store, { EStoreEvents } from "./Store";

export default function Connect(
  Component: typeof Block,
  mapStateToProps: Callback<any>
) {
  return class extends Component {
    constructor(props = {}) {

      const store = new Store();

      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(EStoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
