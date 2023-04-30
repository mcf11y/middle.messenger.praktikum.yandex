import template from "./searchInput.hbs";

interface Props {
  input: HbsNode;
}

const SearchInput = ({ input }: Props) =>
  template({
    input,
  });

export default SearchInput;
