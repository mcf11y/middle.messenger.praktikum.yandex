import Block from "base-component";
import template from "./searchInput.hbs";

type Props = {
  input: Block;
};

class SearchInput extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default SearchInput;
