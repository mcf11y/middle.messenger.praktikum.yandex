import Block from "services/block";

import template from "./SearchInput.hbs";

type Props = {
  input: Block;
};

class SearchInput extends Block<Props> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default SearchInput;
